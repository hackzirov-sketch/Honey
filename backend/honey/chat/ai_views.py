import google.generativeai as genai
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
    genai.configure(api_key=GEMINI_API_KEY)

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
        try:
            model = genai.GenerativeModel(
                model_name=MODEL_NAME,
                system_instruction=system_instruction
            )
            response = model.generate_content(message)
            print("AI SUCCESS")
            return Response({"text": response.text}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"AI Chat Error: {str(e)}")
            try:
                # Fallback to 1.5 flash
                fallback_model = genai.GenerativeModel("gemini-1.5-flash")
                response = fallback_model.generate_content(message)
                return Response({"text": response.text}, status=status.HTTP_200_OK)
            except Exception as e2:
                return Response(
                    {"message": f"AI xatosi: {str(e2)}"}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

    @swagger_auto_schema(tags=["AI"])
    @action(detail=False, methods=["post"], url_path="search")
    def search(self, request):
        query = request.data.get("query", "")
        try:
            model = genai.GenerativeModel(MODEL_NAME)
            response = model.generate_content(f"Search for educational content: {query}")
            return Response({"text": response.text, "sources": []}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @swagger_auto_schema(tags=["AI"])
    @action(detail=False, methods=["post"], url_path="improve")
    def improve(self, request):
        text = request.data.get("text", "")
        try:
            model = genai.GenerativeModel(MODEL_NAME)
            response = model.generate_content(f"Tahrirlab ber: {text}")
            return Response({"text": response.text}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
