from google import genai
from google.genai import types
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from os import getenv
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = getenv("GEMINI_API_KEY")
MODEL_NAME = "models/gemini-2.5-flash"

if GEMINI_API_KEY:
    client = genai.Client(api_key=GEMINI_API_KEY)
else:
    client = None

class AIChatViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Chat with Gemini AI",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "message": openapi.Schema(type=openapi.TYPE_STRING),
                "systemInstruction": openapi.Schema(
                    type=openapi.TYPE_STRING,
                    default="Siz Honey platformasining aqlli yordamchisiz.",
                ),
            },
            required=["message"],
        ),
        responses={
            200: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={"text": openapi.Schema(type=openapi.TYPE_STRING)},
            )
        },
        tags=["AI"],
    )
    @action(detail=False, methods=["post"], url_path="chat")
    def chat(self, request):
        if not GEMINI_API_KEY:
            return Response(
                {"message": "Gemini API sozlanmagan or xato kalit"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        message = request.data.get("message", "")
        system_instruction = request.data.get(
            "systemInstruction",
            "Siz Honey platformasining aqlli yordamchisiz. O'zbek tilida javob bering.",
        )

        print(f"AI Request: {message[:50]}...")
        if not client:
            return Response(
                {"message": "Gemini API Client is not initialized"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        try:
            config = types.GenerateContentConfig(
                system_instruction=system_instruction,
            )
            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=message,
                config=config,
            )
            print("AI SUCCESS")
            return Response({"text": response.text}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"AI Chat Error: {str(e)}")
            try:
                # Fallback to 1.5 flash
                response = client.models.generate_content(
                    model="gemini-1.5-flash",
                    contents=message,
                )
                return Response({"text": response.text}, status=status.HTTP_200_OK)
            except Exception as e2:
                return Response(
                    {"message": f"AI xatosi: {str(e2)}"}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

    @swagger_auto_schema(tags=["AI"])
    @action(detail=False, methods=["post"], url_path="search")
    def search(self, request):
        if not client:
            return Response({"message": "Gemini API Client is not initialized"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        query = request.data.get("query", "")
        try:
            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=f"Search for educational content: {query}"
            )
            return Response({"text": response.text, "sources": []}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @swagger_auto_schema(tags=["AI"])
    @action(detail=False, methods=["post"], url_path="improve")
    def improve(self, request):
        if not client:
            return Response({"message": "Gemini API Client is not initialized"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        text = request.data.get("text", "")
        try:
            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=f"Tahrirlab ber: {text}"
            )
            return Response({"text": response.text}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
