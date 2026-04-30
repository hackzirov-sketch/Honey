(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
            destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
            secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
            destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "span";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/tabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>Tabs,
    "TabsContent",
    ()=>TabsContent,
    "TabsList",
    ()=>TabsList,
    "TabsTrigger",
    ()=>TabsTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-tabs/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Tabs({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "tabs",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tabs.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Tabs;
function TabsList({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["List"], {
        "data-slot": "tabs-list",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tabs.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c1 = TabsList;
function TabsTrigger({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "tabs-trigger",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tabs.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c2 = TabsTrigger;
function TabsContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
        "data-slot": "tabs-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex-1 outline-none", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tabs.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c3 = TabsContent;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Tabs");
__turbopack_context__.k.register(_c1, "TabsList");
__turbopack_context__.k.register(_c2, "TabsTrigger");
__turbopack_context__.k.register(_c3, "TabsContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/progress.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Progress",
    ()=>Progress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-progress/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Progress({ className, value, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "progress",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-primary/20 relative h-2 w-full overflow-hidden rounded-full", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Indicator"], {
            "data-slot": "progress-indicator",
            className: "bg-primary h-full w-full flex-1 transition-all",
            style: {
                transform: `translateX(-${100 - (value || 0)}%)`
            }
        }, void 0, false, {
            fileName: "[project]/src/components/ui/progress.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/progress.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = Progress;
;
var _c;
__turbopack_context__.k.register(_c, "Progress");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Dialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Dialog;
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = DialogTrigger;
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = DialogPortal;
function DialogClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
_c3 = DialogClose;
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c4 = DialogOverlay;
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/dialog.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c5 = DialogContent;
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c6 = DialogHeader;
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c7 = DialogFooter;
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_c8 = DialogTitle;
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_c9 = DialogDescription;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Dialog");
__turbopack_context__.k.register(_c1, "DialogTrigger");
__turbopack_context__.k.register(_c2, "DialogPortal");
__turbopack_context__.k.register(_c3, "DialogClose");
__turbopack_context__.k.register(_c4, "DialogOverlay");
__turbopack_context__.k.register(_c5, "DialogContent");
__turbopack_context__.k.register(_c6, "DialogHeader");
__turbopack_context__.k.register(_c7, "DialogFooter");
__turbopack_context__.k.register(_c8, "DialogTitle");
__turbopack_context__.k.register(_c9, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/mock-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getChatById",
    ()=>getChatById,
    "getMessagesForChat",
    ()=>getMessagesForChat,
    "getNotificationsForUser",
    ()=>getNotificationsForUser,
    "getPostsByUser",
    ()=>getPostsByUser,
    "getStoriesForUser",
    ()=>getStoriesForUser,
    "getUserById",
    ()=>getUserById,
    "mockChats",
    ()=>mockChats,
    "mockFiles",
    ()=>mockFiles,
    "mockMeetings",
    ()=>mockMeetings,
    "mockMessages",
    ()=>mockMessages,
    "mockNotifications",
    ()=>mockNotifications,
    "mockPosts",
    ()=>mockPosts,
    "mockStories",
    ()=>mockStories,
    "mockStreams",
    ()=>mockStreams,
    "mockUsers",
    ()=>mockUsers,
    "mockVideos",
    ()=>mockVideos
]);
const mockUsers = [
    {
        id: 'u1',
        username: 'jasur_karimov',
        displayName: 'Jasur Karimov',
        email: 'jasur@example.com',
        avatar: undefined,
        bio: 'Software engineer & tech enthusiast. Building the future one line at a time. 🚀',
        status: 'online',
        role: 'premium',
        isVerified: true,
        isPremium: true,
        followers: 12400,
        following: 890,
        postsCount: 342,
        joinedAt: '2024-01-15T10:00:00Z',
        lastSeen: new Date().toISOString(),
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: true,
                soundEnabled: true,
                messagePreview: true,
                groupNotifications: true,
                liveNotifications: true
            },
            privacy: {
                profileVisibility: 'public',
                onlineStatus: true,
                readReceipts: true,
                typingIndicator: true,
                lastSeen: true
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        },
        profile: {
            bio: 'Software engineer & tech enthusiast. Building the future one line at a time. 🚀',
            location: 'Tashkent, Uzbekistan',
            website: 'https://jasur.dev',
            birthday: '1995-06-15',
            interests: [
                'technology',
                'photography',
                'travel',
                'AI'
            ],
            socialLinks: {
                twitter: 'jasurdev',
                github: 'jasurkarimov'
            }
        }
    },
    {
        id: 'u2',
        username: 'dilnoza_rakhimova',
        displayName: 'Dilnoza Rakhimova',
        email: 'dilnoza@example.com',
        avatar: undefined,
        bio: 'UX designer crafting beautiful digital experiences ✨',
        status: 'online',
        role: 'premium',
        isVerified: true,
        isPremium: true,
        followers: 8200,
        following: 456,
        postsCount: 189,
        joinedAt: '2024-02-20T10:00:00Z',
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: false,
                soundEnabled: true,
                messagePreview: true,
                groupNotifications: true,
                liveNotifications: false
            },
            privacy: {
                profileVisibility: 'public',
                onlineStatus: true,
                readReceipts: true,
                typingIndicator: true,
                lastSeen: true
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        }
    },
    {
        id: 'u3',
        username: 'timur_aliyev',
        displayName: 'Timur Aliyev',
        email: 'timur@example.com',
        avatar: undefined,
        bio: 'Full-stack developer | Open source contributor | Coffee lover ☕',
        status: 'away',
        role: 'user',
        isVerified: false,
        isPremium: false,
        followers: 3400,
        following: 678,
        postsCount: 95,
        joinedAt: '2024-03-10T10:00:00Z',
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: true,
                soundEnabled: false,
                messagePreview: true,
                groupNotifications: false,
                liveNotifications: true
            },
            privacy: {
                profileVisibility: 'public',
                onlineStatus: true,
                readReceipts: true,
                typingIndicator: false,
                lastSeen: true
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        }
    },
    {
        id: 'u4',
        username: 'nodira_ushakova',
        displayName: 'Nodira Ushakova',
        email: 'nodira@example.com',
        avatar: undefined,
        bio: 'Digital artist & illustrator 🎨 Creating worlds from pixels',
        status: 'online',
        role: 'user',
        isVerified: true,
        isPremium: false,
        followers: 15600,
        following: 312,
        postsCount: 567,
        joinedAt: '2023-11-05T10:00:00Z',
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: true,
                soundEnabled: true,
                messagePreview: true,
                groupNotifications: true,
                liveNotifications: true
            },
            privacy: {
                profileVisibility: 'public',
                onlineStatus: true,
                readReceipts: true,
                typingIndicator: true,
                lastSeen: true
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        }
    },
    {
        id: 'u5',
        username: 'alex_chen',
        displayName: 'Alex Chen',
        email: 'alex@example.com',
        avatar: undefined,
        bio: 'Product designer at a fintech startup. Design systems advocate.',
        status: 'offline',
        role: 'user',
        isVerified: false,
        isPremium: true,
        followers: 5200,
        following: 743,
        postsCount: 210,
        joinedAt: '2024-01-30T10:00:00Z',
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: false,
                soundEnabled: true,
                messagePreview: true,
                groupNotifications: true,
                liveNotifications: false
            },
            privacy: {
                profileVisibility: 'public',
                onlineStatus: false,
                readReceipts: true,
                typingIndicator: true,
                lastSeen: false
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        }
    },
    {
        id: 'u6',
        username: 'sardor_mirzayev',
        displayName: 'Sardor Mirzayev',
        email: 'sardor@example.com',
        avatar: undefined,
        bio: 'Data scientist & ML engineer. Turning data into insights 📊',
        status: 'busy',
        role: 'moderator',
        isVerified: true,
        isPremium: false,
        followers: 9800,
        following: 234,
        postsCount: 156,
        joinedAt: '2023-09-20T10:00:00Z',
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: true,
                soundEnabled: true,
                messagePreview: true,
                groupNotifications: true,
                liveNotifications: true
            },
            privacy: {
                profileVisibility: 'public',
                onlineStatus: true,
                readReceipts: true,
                typingIndicator: true,
                lastSeen: true
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        }
    },
    {
        id: 'u7',
        username: 'maria_garcia',
        displayName: 'Maria Garcia',
        email: 'maria@example.com',
        avatar: undefined,
        bio: 'Content creator & lifestyle blogger. Living my best life ✨',
        status: 'online',
        role: 'user',
        isVerified: true,
        isPremium: true,
        followers: 24500,
        following: 567,
        postsCount: 890,
        joinedAt: '2023-06-10T10:00:00Z',
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: true,
                soundEnabled: true,
                messagePreview: true,
                groupNotifications: true,
                liveNotifications: true
            },
            privacy: {
                profileVisibility: 'public',
                onlineStatus: true,
                readReceipts: true,
                typingIndicator: true,
                lastSeen: true
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        }
    },
    {
        id: 'u8',
        username: 'bobur_toshmatov',
        displayName: 'Bobur Toshmatov',
        email: 'bobur@example.com',
        avatar: undefined,
        bio: 'Backend engineer | Rust & Go enthusiast | Distributed systems',
        status: 'offline',
        role: 'user',
        isVerified: false,
        isPremium: false,
        followers: 2100,
        following: 890,
        postsCount: 67,
        joinedAt: '2024-04-05T10:00:00Z',
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: false,
                soundEnabled: true,
                messagePreview: true,
                groupNotifications: false,
                liveNotifications: true
            },
            privacy: {
                profileVisibility: 'friends',
                onlineStatus: true,
                readReceipts: true,
                typingIndicator: false,
                lastSeen: true
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        }
    },
    {
        id: 'u9',
        username: 'yuki_tanaka',
        displayName: 'Yuki Tanaka',
        email: 'yuki@example.com',
        avatar: undefined,
        bio: 'iOS developer by day, game dev by night 🎮',
        status: 'online',
        role: 'user',
        isVerified: false,
        isPremium: false,
        followers: 6700,
        following: 445,
        postsCount: 234,
        joinedAt: '2024-02-14T10:00:00Z',
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: true,
                soundEnabled: true,
                messagePreview: true,
                groupNotifications: true,
                liveNotifications: false
            },
            privacy: {
                profileVisibility: 'public',
                onlineStatus: true,
                readReceipts: true,
                typingIndicator: true,
                lastSeen: true
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        }
    },
    {
        id: 'u10',
        username: 'olivia_smith',
        displayName: 'Olivia Smith',
        email: 'olivia@example.com',
        avatar: undefined,
        bio: 'Marketing manager | Brand strategist | Coffee addict ☕',
        status: 'away',
        role: 'user',
        isVerified: false,
        isPremium: false,
        followers: 4300,
        following: 678,
        postsCount: 145,
        joinedAt: '2024-03-25T10:00:00Z',
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: true,
                soundEnabled: false,
                messagePreview: true,
                groupNotifications: true,
                liveNotifications: false
            },
            privacy: {
                profileVisibility: 'public',
                onlineStatus: true,
                readReceipts: true,
                typingIndicator: true,
                lastSeen: true
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        }
    }
];
const mockMessages = [
    {
        id: 'm1',
        chatId: 'c1',
        senderId: 'u2',
        content: 'Hey Jasur! Have you seen the new design system updates? They look incredible 🔥',
        type: 'text',
        status: 'read',
        reactions: [
            {
                emoji: '🔥',
                userIds: [
                    'u1'
                ]
            }
        ],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString()
    },
    {
        id: 'm2',
        chatId: 'c1',
        senderId: 'u1',
        content: 'Yes! The glassmorphism approach is exactly what we needed. The dark mode variant is stunning.',
        type: 'text',
        status: 'read',
        reactions: [
            {
                emoji: '💯',
                userIds: [
                    'u2'
                ]
            },
            {
                emoji: '✨',
                userIds: [
                    'u2'
                ]
            }
        ],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString()
    },
    {
        id: 'm3',
        chatId: 'c1',
        senderId: 'u2',
        content: 'I also added some micro-interactions with Framer Motion. Want me to share the prototype?',
        type: 'text',
        status: 'read',
        reactions: [],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 1).toISOString()
    },
    {
        id: 'm4',
        chatId: 'c2',
        senderId: 'u3',
        content: 'The deployment went smoothly. All services are up and running 🚀',
        type: 'text',
        status: 'delivered',
        reactions: [
            {
                emoji: '🎉',
                userIds: [
                    'u1',
                    'u6'
                ]
            }
        ],
        attachments: [],
        mentions: [
            'u6'
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
    },
    {
        id: 'm5',
        chatId: 'c2',
        senderId: 'u6',
        content: 'Great work Timur! The API response times are down to 45ms average. Sardor optimized the queries.',
        type: 'text',
        status: 'read',
        reactions: [
            {
                emoji: '💪',
                userIds: [
                    'u3',
                    'u1'
                ]
            }
        ],
        attachments: [],
        mentions: [
            'u3'
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString()
    },
    {
        id: 'm6',
        chatId: 'c2',
        senderId: 'u1',
        content: 'Amazing team effort! Let\'s push the next feature branch tomorrow morning.',
        type: 'text',
        status: 'read',
        reactions: [],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
    },
    {
        id: 'm7',
        chatId: 'c3',
        senderId: 'u4',
        content: 'Just finished the new illustration set for the onboarding flow! Check it out 🎨',
        type: 'text',
        status: 'read',
        reactions: [
            {
                emoji: '😍',
                userIds: [
                    'u1',
                    'u2',
                    'u5'
                ]
            }
        ],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString()
    },
    {
        id: 'm8',
        chatId: 'c3',
        senderId: 'u5',
        content: 'Nodira these are beautiful! The color palette is perfect for our brand.',
        type: 'text',
        status: 'read',
        reactions: [
            {
                emoji: '❤️',
                userIds: [
                    'u4'
                ]
            }
        ],
        attachments: [],
        mentions: [
            'u4'
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString()
    },
    {
        id: 'm9',
        chatId: 'c4',
        senderId: 'u7',
        content: 'Going live in 10 minutes! Today we\'re discussing the latest web design trends for 2025 🎬',
        type: 'text',
        status: 'delivered',
        reactions: [
            {
                emoji: '🎬',
                userIds: [
                    'u1',
                    'u9',
                    'u10'
                ]
            }
        ],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString()
    },
    {
        id: 'm10',
        chatId: 'c5',
        senderId: 'u9',
        content: 'Just published my first indie game on the App Store! It\'s a puzzle adventure called "Crystal Maze" 🎮',
        type: 'text',
        status: 'read',
        reactions: [
            {
                emoji: '🎮',
                userIds: [
                    'u1'
                ]
            },
            {
                emoji: '🎉',
                userIds: [
                    'u3'
                ]
            },
            {
                emoji: '🏆',
                userIds: [
                    'u6'
                ]
            }
        ],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString()
    },
    {
        id: 'm11',
        chatId: 'c6',
        senderId: 'u10',
        content: 'The Q4 marketing report is ready for review. Revenue is up 23% from last quarter! 📈',
        type: 'text',
        status: 'delivered',
        reactions: [],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString()
    },
    {
        id: 'm12',
        chatId: 'c7',
        senderId: 'u1',
        content: 'Welcome to the Honey Design Community! Feel free to share your work and get feedback 🍯',
        type: 'text',
        status: 'read',
        reactions: [
            {
                emoji: '🍯',
                userIds: [
                    'u2',
                    'u3',
                    'u4',
                    'u5'
                ]
            }
        ],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    },
    {
        id: 'm13',
        chatId: 'c8',
        senderId: 'u6',
        content: '📢 Weekly ML paper reading session tomorrow at 7PM Tashkent time. This week: Attention Is All You Need revisited.',
        type: 'text',
        status: 'delivered',
        reactions: [
            {
                emoji: '📚',
                userIds: [
                    'u1',
                    'u3'
                ]
            }
        ],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString()
    }
];
const mockChats = [
    {
        id: 'c1',
        type: 'private',
        participants: [
            {
                userId: 'u1',
                role: 'member',
                joinedAt: '2024-01-15T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u2',
                role: 'member',
                joinedAt: '2024-01-15T10:00:00Z',
                isMuted: false
            }
        ],
        lastMessage: mockMessages[2],
        unreadCount: 1,
        isPinned: true,
        isMuted: false,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: new Date(Date.now() - 1000 * 60 * 1).toISOString()
    },
    {
        id: 'c2',
        type: 'group',
        name: 'Dev Team 🛠️',
        avatar: undefined,
        description: 'Development team coordination',
        participants: [
            {
                userId: 'u1',
                role: 'admin',
                joinedAt: '2024-01-20T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u3',
                role: 'member',
                joinedAt: '2024-01-20T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u6',
                role: 'member',
                joinedAt: '2024-01-20T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u8',
                role: 'member',
                joinedAt: '2024-04-05T10:00:00Z',
                isMuted: false
            }
        ],
        admins: [
            'u1'
        ],
        memberCount: 4,
        lastMessage: mockMessages[5],
        unreadCount: 2,
        isPinned: true,
        isMuted: false,
        createdAt: '2024-01-20T10:00:00Z',
        updatedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
    },
    {
        id: 'c3',
        type: 'group',
        name: 'Design Studio',
        avatar: undefined,
        description: 'Creative discussions and design reviews',
        participants: [
            {
                userId: 'u2',
                role: 'admin',
                joinedAt: '2024-02-01T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u4',
                role: 'member',
                joinedAt: '2024-02-01T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u5',
                role: 'member',
                joinedAt: '2024-02-01T10:00:00Z',
                isMuted: false
            }
        ],
        admins: [
            'u2'
        ],
        memberCount: 3,
        lastMessage: mockMessages[7],
        unreadCount: 0,
        isPinned: false,
        isMuted: false,
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: new Date(Date.now() - 1000 * 60 * 55).toISOString()
    },
    {
        id: 'c4',
        type: 'private',
        participants: [
            {
                userId: 'u1',
                role: 'member',
                joinedAt: '2024-03-01T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u7',
                role: 'member',
                joinedAt: '2024-03-01T10:00:00Z',
                isMuted: false
            }
        ],
        lastMessage: mockMessages[8],
        unreadCount: 0,
        isPinned: false,
        isMuted: false,
        createdAt: '2024-03-01T10:00:00Z',
        updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString()
    },
    {
        id: 'c5',
        type: 'private',
        participants: [
            {
                userId: 'u1',
                role: 'member',
                joinedAt: '2024-02-14T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u9',
                role: 'member',
                joinedAt: '2024-02-14T10:00:00Z',
                isMuted: false
            }
        ],
        lastMessage: mockMessages[9],
        unreadCount: 0,
        isPinned: false,
        isMuted: true,
        createdAt: '2024-02-14T10:00:00Z',
        updatedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString()
    },
    {
        id: 'c6',
        type: 'private',
        participants: [
            {
                userId: 'u1',
                role: 'member',
                joinedAt: '2024-03-25T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u10',
                role: 'member',
                joinedAt: '2024-03-25T10:00:00Z',
                isMuted: false
            }
        ],
        lastMessage: mockMessages[10],
        unreadCount: 1,
        isPinned: false,
        isMuted: false,
        createdAt: '2024-03-25T10:00:00Z',
        updatedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString()
    },
    {
        id: 'c7',
        type: 'channel',
        name: 'Honey Design Community',
        avatar: undefined,
        description: 'Official design community for Honey platform',
        participants: [
            {
                userId: 'u1',
                role: 'owner',
                joinedAt: '2024-01-10T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u2',
                role: 'admin',
                joinedAt: '2024-01-10T10:00:00Z',
                isMuted: false
            }
        ],
        admins: [
            'u1',
            'u2'
        ],
        memberCount: 1240,
        isPrivate: false,
        category: 'Design',
        lastMessage: mockMessages[11],
        unreadCount: 5,
        isPinned: true,
        isMuted: false,
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    },
    {
        id: 'c8',
        type: 'channel',
        name: 'ML & Data Science',
        avatar: undefined,
        description: 'Machine learning discussions, paper reviews, and AI news',
        participants: [
            {
                userId: 'u6',
                role: 'owner',
                joinedAt: '2024-02-01T10:00:00Z',
                isMuted: false
            }
        ],
        admins: [
            'u6'
        ],
        memberCount: 3200,
        isPrivate: false,
        category: 'Technology',
        lastMessage: mockMessages[12],
        unreadCount: 1,
        isPinned: false,
        isMuted: false,
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString()
    }
];
// ============================================
// Mock Posts
// ============================================
const mockComments = [
    {
        id: 'cm1',
        postId: 'p1',
        authorId: 'u2',
        content: 'This is absolutely gorgeous! The attention to detail is incredible 🔥',
        likes: 12,
        isLiked: false,
        replies: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
    },
    {
        id: 'cm2',
        postId: 'p1',
        authorId: 'u4',
        content: 'Love the color transitions. Very smooth!',
        likes: 8,
        isLiked: true,
        replies: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
    },
    {
        id: 'cm3',
        postId: 'p2',
        authorId: 'u3',
        content: 'The golden hour shots are magical. What camera did you use?',
        likes: 5,
        isLiked: false,
        replies: [
            {
                id: 'cm3r1',
                postId: 'p2',
                authorId: 'u7',
                content: 'Canon R5 with a 24-70mm f/2.8 lens! 📸',
                likes: 3,
                isLiked: false,
                replies: [],
                createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString()
            }
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
    }
];
const mockPosts = [
    {
        id: 'p1',
        authorId: 'u4',
        content: 'New illustration series: "Digital Botanics" 🌿✨ Exploring the intersection of nature and technology through digital art. Each piece took about 12 hours to complete.',
        type: 'image',
        visibility: 'public',
        media: [],
        hashtags: [
            '#DigitalArt',
            '#Illustration',
            '#Botanics',
            '#CreativeProcess'
        ],
        mentions: [],
        likes: 847,
        comments: [
            mockComments[0],
            mockComments[1]
        ],
        commentCount: 24,
        shares: 56,
        isLiked: true,
        isShared: false,
        isBookmarked: true,
        isPinned: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
    },
    {
        id: 'p2',
        authorId: 'u7',
        content: 'Golden hour in Tashkent never disappoints 🌅 The way the light hits the old city walls is something truly magical. #Photography #GoldenHour #Tashkent #Travel',
        type: 'image',
        visibility: 'public',
        media: [],
        hashtags: [
            '#Photography',
            '#GoldenHour',
            '#Tashkent',
            '#Travel'
        ],
        mentions: [],
        likes: 2340,
        comments: [
            mockComments[2]
        ],
        commentCount: 89,
        shares: 134,
        isLiked: false,
        isShared: true,
        isBookmarked: false,
        isPinned: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString()
    },
    {
        id: 'p3',
        authorId: 'u1',
        content: 'Just shipped a major update to our design system! Here\'s what\'s new:\n\n✅ Glassmorphism component library\n✅ 50+ new animations\n✅ Dark mode improvements\n✅ Accessibility audit passed\n\nBuilding in public feels great! 🚀',
        type: 'text',
        visibility: 'public',
        media: [],
        hashtags: [
            '#BuildInPublic',
            '#DesignSystem',
            '#OpenSource'
        ],
        mentions: [],
        likes: 456,
        comments: [],
        commentCount: 32,
        shares: 78,
        isLiked: false,
        isShared: false,
        isBookmarked: false,
        isPinned: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
    },
    {
        id: 'p4',
        authorId: 'u6',
        content: 'Exciting results from our latest ML experiment! Our new model achieved 97.3% accuracy on the benchmark dataset, a 4.2% improvement over the previous state-of-the-art. Paper coming soon! 📊 #MachineLearning #AI',
        type: 'text',
        visibility: 'public',
        media: [],
        hashtags: [
            '#MachineLearning',
            '#AI',
            '#Research',
            '#DataScience'
        ],
        mentions: [],
        likes: 892,
        comments: [],
        commentCount: 67,
        shares: 156,
        isLiked: true,
        isShared: false,
        isBookmarked: true,
        isPinned: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    },
    {
        id: 'p5',
        authorId: 'u5',
        content: 'Redesigned the entire onboarding flow. Conversion rate went from 34% to 58%. The key insight? Less is more. We cut the steps from 7 to 3 and made each one count. #UXDesign #ProductDesign',
        type: 'text',
        visibility: 'public',
        media: [],
        hashtags: [
            '#UXDesign',
            '#ProductDesign',
            '#ConversionOptimization'
        ],
        mentions: [],
        likes: 1203,
        comments: [],
        commentCount: 45,
        shares: 89,
        isLiked: false,
        isShared: false,
        isBookmarked: false,
        isPinned: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString()
    }
];
const mockStories = [
    {
        userId: 'u2',
        stories: [
            {
                id: 's1',
                authorId: 'u2',
                media: {
                    id: 'sm1',
                    type: 'image',
                    url: '',
                    thumbnailUrl: '',
                    alt: 'Design workspace'
                },
                type: 'image',
                caption: 'New design workspace setup! ✨',
                isViewed: false,
                viewers: [],
                viewerCount: 234,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 22).toISOString()
            },
            {
                id: 's2',
                authorId: 'u2',
                media: {
                    id: 'sm2',
                    type: 'image',
                    url: '',
                    thumbnailUrl: '',
                    alt: 'Coffee break'
                },
                type: 'image',
                caption: 'Coffee break with the team ☕',
                isViewed: false,
                viewers: [],
                viewerCount: 189,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 20).toISOString()
            }
        ],
        hasUnviewed: true,
        latestStory: {}
    },
    {
        userId: 'u7',
        stories: [
            {
                id: 's3',
                authorId: 'u7',
                media: {
                    id: 'sm3',
                    type: 'video',
                    url: '',
                    thumbnailUrl: '',
                    alt: 'Travel vlog'
                },
                type: 'video',
                caption: 'Behind the scenes of today\'s shoot 🎬',
                isViewed: false,
                viewers: [],
                viewerCount: 567,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 23).toISOString()
            }
        ],
        hasUnviewed: true,
        latestStory: {}
    },
    {
        userId: 'u4',
        stories: [
            {
                id: 's4',
                authorId: 'u4',
                media: {
                    id: 'sm4',
                    type: 'image',
                    url: '',
                    thumbnailUrl: '',
                    alt: 'Art progress'
                },
                type: 'image',
                caption: 'Work in progress... coming together beautifully 🎨',
                isViewed: false,
                viewers: [],
                viewerCount: 892,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 21).toISOString()
            },
            {
                id: 's5',
                authorId: 'u4',
                media: {
                    id: 'sm5',
                    type: 'image',
                    url: '',
                    thumbnailUrl: '',
                    alt: 'Finished piece'
                },
                type: 'image',
                caption: 'Finished! Swipe to see the final piece 🖼️',
                isViewed: false,
                viewers: [],
                viewerCount: 1043,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 19).toISOString()
            }
        ],
        hasUnviewed: true,
        latestStory: {}
    },
    {
        userId: 'u9',
        stories: [
            {
                id: 's6',
                authorId: 'u9',
                media: {
                    id: 'sm6',
                    type: 'image',
                    url: '',
                    thumbnailUrl: '',
                    alt: 'Game development'
                },
                type: 'image',
                caption: 'Crystal Maze - Day 180 of development 🎮',
                isViewed: true,
                viewers: [
                    {
                        userId: 'u1',
                        viewedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
                    }
                ],
                viewerCount: 345,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString()
            }
        ],
        hasUnviewed: false,
        latestStory: {}
    },
    {
        userId: 'u6',
        stories: [
            {
                id: 's7',
                authorId: 'u6',
                media: {
                    id: 'sm7',
                    type: 'image',
                    url: '',
                    thumbnailUrl: '',
                    alt: 'ML visualization'
                },
                type: 'image',
                caption: 'Beautiful neural network visualization from today\'s research 🧠',
                isViewed: true,
                viewers: [
                    {
                        userId: 'u1',
                        viewedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString()
                    }
                ],
                viewerCount: 456,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 16).toISOString()
            }
        ],
        hasUnviewed: false,
        latestStory: {}
    }
];
const mockVideos = [
    {
        id: 'v1',
        title: 'Building a Design System from Scratch - Full Tutorial',
        description: 'In this comprehensive tutorial, we build a complete design system using Figma, covering tokens, components, and documentation.',
        authorId: 'u2',
        url: '',
        thumbnailUrl: '',
        duration: 2847,
        views: 45600,
        likes: 3420,
        dislikes: 23,
        comments: [],
        commentCount: 234,
        isLiked: false,
        isDisliked: false,
        isBookmarked: true,
        category: 'Design',
        tags: [
            'design system',
            'figma',
            'tutorial',
            'ui'
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
    },
    {
        id: 'v2',
        title: 'Advanced TypeScript Patterns Every Developer Should Know',
        description: 'Deep dive into advanced TypeScript patterns including template literals, conditional types, and mapped types.',
        authorId: 'u1',
        url: '',
        thumbnailUrl: '',
        duration: 1920,
        views: 23400,
        likes: 1890,
        dislikes: 12,
        comments: [],
        commentCount: 156,
        isLiked: true,
        isDisliked: false,
        isBookmarked: false,
        category: 'Technology',
        tags: [
            'typescript',
            'programming',
            'tutorial'
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString()
    },
    {
        id: 'v3',
        title: 'Digital Art Process: From Sketch to Final Piece',
        description: 'Watch the complete process of creating a digital illustration from initial concept sketch to the final polished artwork.',
        authorId: 'u4',
        url: '',
        thumbnailUrl: '',
        duration: 3600,
        views: 67800,
        likes: 5670,
        dislikes: 15,
        comments: [],
        commentCount: 345,
        isLiked: false,
        isDisliked: false,
        isBookmarked: true,
        category: 'Art',
        tags: [
            'digital art',
            'illustration',
            'process',
            'art'
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString()
    },
    {
        id: 'v4',
        title: 'Machine Learning in Production: Lessons Learned',
        description: 'Real-world lessons from deploying ML models at scale. Covering monitoring, drift detection, and model versioning.',
        authorId: 'u6',
        url: '',
        thumbnailUrl: '',
        duration: 2400,
        views: 18900,
        likes: 1456,
        dislikes: 8,
        comments: [],
        commentCount: 98,
        isLiked: false,
        isDisliked: false,
        isBookmarked: false,
        category: 'Technology',
        tags: [
            'machine learning',
            'production',
            'mlops'
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString()
    },
    {
        id: 'v5',
        title: 'Tashkent Street Food Tour - Hidden Gems',
        description: 'Exploring the best street food spots in Tashkent, from plov to samsa. A culinary adventure through Uzbekistan\'s capital.',
        authorId: 'u7',
        url: '',
        thumbnailUrl: '',
        duration: 1800,
        views: 123000,
        likes: 8900,
        dislikes: 45,
        comments: [],
        commentCount: 567,
        isLiked: true,
        isDisliked: false,
        isBookmarked: false,
        category: 'Lifestyle',
        tags: [
            'food',
            'travel',
            'tashkent',
            'uzbekistan'
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString()
    }
];
const mockStreams = [
    {
        id: 'st1',
        title: 'Live Coding: Building a Real-time Chat App',
        description: 'Building a real-time chat application with Next.js and Socket.io from scratch. Ask questions in the chat!',
        streamerId: 'u3',
        thumbnailUrl: '',
        categoryId: 'tech',
        category: 'Technology',
        tags: [
            'coding',
            'nextjs',
            'socket.io',
            'livestream'
        ],
        viewers: 342,
        peakViewers: 456,
        isLive: true,
        isRecorded: false,
        startedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
    },
    {
        id: 'st2',
        title: 'Digital Art Stream: Fantasy Character Design',
        description: 'Designing a fantasy character from scratch. Join me as I explore different styles and techniques!',
        streamerId: 'u4',
        thumbnailUrl: '',
        categoryId: 'art',
        category: 'Art',
        tags: [
            'art',
            'digital art',
            'character design',
            'fantasy'
        ],
        viewers: 1890,
        peakViewers: 2100,
        isLive: true,
        isRecorded: false,
        startedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString()
    },
    {
        id: 'st3',
        title: 'Music Production: Lo-fi Beats Session',
        description: 'Creating chill lo-fi beats. Requests welcome in the chat! 🎵',
        streamerId: 'u7',
        thumbnailUrl: '',
        categoryId: 'music',
        category: 'Music',
        tags: [
            'music',
            'lo-fi',
            'beats',
            'production'
        ],
        viewers: 567,
        peakViewers: 678,
        isLive: true,
        isRecorded: false,
        startedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
    },
    {
        id: 'st4',
        title: 'AI Research Discussion: Latest in LLMs',
        description: 'Weekly discussion on the latest developments in large language models and AI research.',
        streamerId: 'u6',
        thumbnailUrl: '',
        categoryId: 'tech',
        category: 'Technology',
        tags: [
            'ai',
            'llm',
            'research',
            'machine learning'
        ],
        viewers: 2340,
        peakViewers: 2800,
        isLive: false,
        isRecorded: true,
        startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        endedAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
        duration: 7200
    },
    {
        id: 'st5',
        title: 'UI/UX Design Review: Community Submissions',
        description: 'Reviewing design submissions from the community. Providing feedback and tips!',
        streamerId: 'u5',
        thumbnailUrl: '',
        categoryId: 'design',
        category: 'Design',
        tags: [
            'design',
            'ui',
            'ux',
            'review'
        ],
        viewers: 0,
        peakViewers: 1234,
        isLive: false,
        isRecorded: true,
        startedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        endedAt: new Date(Date.now() - 1000 * 60 * 60 * 45).toISOString(),
        duration: 10800
    }
];
const mockMeetings = [
    {
        id: 'mt1',
        title: 'Sprint Planning - Week 18',
        description: 'Planning session for the upcoming sprint. Review backlog items and assign tasks.',
        hostId: 'u1',
        participants: [
            {
                userId: 'u1',
                role: 'host',
                isMuted: false,
                isVideoOn: true,
                isScreenSharing: false
            },
            {
                userId: 'u3',
                role: 'participant',
                isMuted: true,
                isVideoOn: false,
                isScreenSharing: false
            },
            {
                userId: 'u6',
                role: 'participant',
                isMuted: true,
                isVideoOn: true,
                isScreenSharing: false
            },
            {
                userId: 'u8',
                role: 'participant',
                isMuted: false,
                isVideoOn: false,
                isScreenSharing: false
            }
        ],
        scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
        duration: 60,
        status: 'scheduled',
        meetingLink: 'meet/honey/sprint-18',
        type: 'video',
        isMuted: false,
        isRecording: false,
        maxParticipants: 10,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    },
    {
        id: 'mt2',
        title: 'Design Review: Mobile App v2',
        description: 'Review the latest designs for the mobile app version 2. Focus on the new navigation and chat interface.',
        hostId: 'u2',
        participants: [
            {
                userId: 'u2',
                role: 'host',
                isMuted: false,
                isVideoOn: true,
                isScreenSharing: true
            },
            {
                userId: 'u4',
                role: 'participant',
                isMuted: false,
                isVideoOn: true,
                isScreenSharing: false
            },
            {
                userId: 'u5',
                role: 'participant',
                isMuted: false,
                isVideoOn: true,
                isScreenSharing: false
            }
        ],
        scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(),
        duration: 45,
        status: 'scheduled',
        meetingLink: 'meet/honey/design-review',
        type: 'video',
        isMuted: false,
        isRecording: false,
        maxParticipants: 8,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
    },
    {
        id: 'mt3',
        title: '1:1 with Sardor - Project Update',
        description: 'Weekly sync to discuss ML pipeline improvements and data pipeline architecture.',
        hostId: 'u1',
        participants: [
            {
                userId: 'u1',
                role: 'host',
                isMuted: false,
                isVideoOn: true,
                isScreenSharing: false
            },
            {
                userId: 'u6',
                role: 'participant',
                isMuted: false,
                isVideoOn: true,
                isScreenSharing: false
            }
        ],
        scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        duration: 30,
        status: 'scheduled',
        meetingLink: 'meet/honey/1on1-sardor',
        type: 'video',
        isMuted: false,
        isRecording: false,
        maxParticipants: 2,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString()
    }
];
const mockNotifications = [
    {
        id: 'n1',
        type: 'like',
        title: 'New Like',
        body: 'Dilnoza Rakhimova liked your post "Design System Update"',
        fromUserId: 'u2',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        actionUrl: '/feed'
    },
    {
        id: 'n2',
        type: 'comment',
        title: 'New Comment',
        body: 'Timur Aliyev commented on your post: "This is amazing work! 🚀"',
        fromUserId: 'u3',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        actionUrl: '/feed'
    },
    {
        id: 'n3',
        type: 'follow',
        title: 'New Follower',
        body: 'Yuki Tanaka started following you',
        fromUserId: 'u9',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        actionUrl: '/profile/u9'
    },
    {
        id: 'n4',
        type: 'message',
        title: 'New Message',
        body: 'Dilnoza Rakhimova sent you a message: "Want me to share the prototype?"',
        fromUserId: 'u2',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        actionUrl: '/hub'
    },
    {
        id: 'n5',
        type: 'mention',
        title: 'Mentioned You',
        body: 'Sardor Mirzayev mentioned you in Dev Team: "Great work @Jasur!"',
        fromUserId: 'u6',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        actionUrl: '/hub'
    },
    {
        id: 'n6',
        type: 'stream',
        title: 'Live Stream Started',
        body: 'Nodira Ushakova started streaming: "Digital Art Stream"',
        fromUserId: 'u4',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        actionUrl: '/streams'
    },
    {
        id: 'n7',
        type: 'meeting',
        title: 'Meeting Reminder',
        body: 'Sprint Planning - Week 18 starts in 2 hours',
        fromUserId: 'u1',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
        actionUrl: '/meet'
    },
    {
        id: 'n8',
        type: 'group_invite',
        title: 'Group Invitation',
        body: 'Alex Chen invited you to join "UX Research Group"',
        fromUserId: 'u5',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        actionUrl: '/hub'
    },
    {
        id: 'n9',
        type: 'achievement',
        title: 'Achievement Unlocked! 🏆',
        body: 'You\'ve reached 10,000 followers! Congratulations on building an amazing community.',
        fromUserId: 'u1',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        actionUrl: '/profile'
    },
    {
        id: 'n10',
        type: 'like',
        title: 'Post Trending',
        body: 'Your post "Design System Update" is trending with 456 likes!',
        fromUserId: 'u1',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
        actionUrl: '/feed'
    }
];
const mockFiles = [
    {
        id: 'f1',
        name: 'Honey_DesignSystem_v2.fig',
        type: 'document',
        size: 24576000,
        url: '',
        mimeType: 'application/x-figma',
        uploadedBy: 'u2',
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        folder: 'Design'
    },
    {
        id: 'f2',
        name: 'project-proposal.pdf',
        type: 'document',
        size: 3145728,
        url: '',
        mimeType: 'application/pdf',
        uploadedBy: 'u1',
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        folder: 'Documents'
    },
    {
        id: 'f3',
        name: 'team-photo-2024.jpg',
        type: 'image',
        size: 5242880,
        url: '',
        mimeType: 'image/jpeg',
        uploadedBy: 'u7',
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        thumbnailUrl: '',
        width: 4000,
        height: 3000,
        folder: 'Photos'
    },
    {
        id: 'f4',
        name: 'sprint-demo-recording.mp4',
        type: 'video',
        size: 104857600,
        url: '',
        mimeType: 'video/mp4',
        uploadedBy: 'u3',
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        thumbnailUrl: '',
        duration: 1800,
        folder: 'Videos'
    },
    {
        id: 'f5',
        name: 'ML-model-weights-v3.bin',
        type: 'other',
        size: 524288000,
        url: '',
        mimeType: 'application/octet-stream',
        uploadedBy: 'u6',
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
        folder: 'ML'
    },
    {
        id: 'f6',
        name: 'podcast-episode-12.mp3',
        type: 'audio',
        size: 52428800,
        url: '',
        mimeType: 'audio/mpeg',
        uploadedBy: 'u7',
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
        duration: 3600,
        folder: 'Audio'
    }
];
function getUserById(id) {
    return mockUsers.find((u)=>u.id === id);
}
function getChatById(id) {
    return mockChats.find((c)=>c.id === id);
}
function getMessagesForChat(chatId) {
    return mockMessages.filter((m)=>m.chatId === chatId);
}
function getPostsByUser(userId) {
    return mockPosts.filter((p)=>p.authorId === userId);
}
function getStoriesForUser(userId) {
    return mockStories.find((sg)=>sg.userId === userId)?.stories ?? [];
}
function getNotificationsForUser() {
    return mockNotifications;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/files-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FilesSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as ImageIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/video.js [app-client] (ecmascript) <export default as Video>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3X3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grid-3x3.js [app-client] (ecmascript) <export default as Grid3X3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder-open.js [app-client] (ecmascript) <export default as FolderOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$drive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HardDrive$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hard-drive.js [app-client] (ecmascript) <export default as HardDrive>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/progress.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
function FilesSection() {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('newest');
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('grid');
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedFiles, setSelectedFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [previewFile, setPreviewFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSelectMode, setIsSelectMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSortMenu, setShowSortMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showUploadDialog, setShowUploadDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const filteredFiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FilesSection.useMemo[filteredFiles]": ()=>{
            let files = [
                ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockFiles"]
            ];
            // Filter by tab
            if (activeTab !== 'all') {
                const typeMap = {
                    images: [
                        'image'
                    ],
                    videos: [
                        'video'
                    ],
                    documents: [
                        'document',
                        'archive'
                    ],
                    links: [],
                    voice: [
                        'audio'
                    ]
                };
                files = files.filter({
                    "FilesSection.useMemo[filteredFiles]": (f)=>typeMap[activeTab]?.includes(f.type)
                }["FilesSection.useMemo[filteredFiles]"]);
            }
            // Filter by search
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                files = files.filter({
                    "FilesSection.useMemo[filteredFiles]": (f)=>f.name.toLowerCase().includes(q)
                }["FilesSection.useMemo[filteredFiles]"]);
            }
            // Sort
            const sorted = [
                ...files
            ];
            switch(sortBy){
                case 'newest':
                    sorted.sort({
                        "FilesSection.useMemo[filteredFiles]": (a, b)=>new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
                    }["FilesSection.useMemo[filteredFiles]"]);
                    break;
                case 'oldest':
                    sorted.sort({
                        "FilesSection.useMemo[filteredFiles]": (a, b)=>new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
                    }["FilesSection.useMemo[filteredFiles]"]);
                    break;
                case 'largest':
                    sorted.sort({
                        "FilesSection.useMemo[filteredFiles]": (a, b)=>b.size - a.size
                    }["FilesSection.useMemo[filteredFiles]"]);
                    break;
                case 'smallest':
                    sorted.sort({
                        "FilesSection.useMemo[filteredFiles]": (a, b)=>a.size - b.size
                    }["FilesSection.useMemo[filteredFiles]"]);
                    break;
                case 'name':
                    sorted.sort({
                        "FilesSection.useMemo[filteredFiles]": (a, b)=>a.name.localeCompare(b.name)
                    }["FilesSection.useMemo[filteredFiles]"]);
                    break;
            }
            return sorted;
        }
    }["FilesSection.useMemo[filteredFiles]"], [
        activeTab,
        sortBy,
        searchQuery
    ]);
    const storageUsed = 2.4;
    const storageTotal = 5;
    const storagePercent = storageUsed / storageTotal * 100;
    const storageBreakdown = [
        {
            label: 'ImageIcons',
            size: 1.2,
            color: 'bg-honey',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__["ImageIcon"]
        },
        {
            label: 'Videos',
            size: 0.8,
            color: 'bg-blue-400',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"]
        },
        {
            label: 'Documents',
            size: 0.3,
            color: 'bg-green-400',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
        },
        {
            label: 'Other',
            size: 0.1,
            color: 'bg-purple-400',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderOpen$3e$__["FolderOpen"]
        }
    ];
    const toggleSelect = (id)=>{
        setSelectedFiles((prev)=>{
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };
    const selectAll = ()=>{
        if (selectedFiles.size === filteredFiles.length) {
            setSelectedFiles(new Set());
        } else {
            setSelectedFiles(new Set(filteredFiles.map((f)=>f.id)));
        }
    };
    const clearSelection = ()=>{
        setSelectedFiles(new Set());
        setIsSelectMode(false);
    };
    const deleteSelected = ()=>{
        // Mock delete
        clearSelection();
    };
    const getFileIcon = (type)=>{
        if (type === 'image') return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__["ImageIcon"];
        if (type === 'video') return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"];
        if (type === 'audio') return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"];
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"];
    };
    const getFileTypeBadge = (type)=>{
        if (type === 'image') return 'IMG';
        if (type === 'video') return 'MP4';
        if (type === 'audio') return 'VOX';
        if (type === 'document') return 'DOC';
        if (type === 'archive') return 'ZIP';
        return 'FILE';
    };
    const getFileColor = (type)=>{
        if (type === 'image') return 'from-honey/30 to-amber-700/30';
        if (type === 'video') return 'from-blue-400/30 to-blue-700/30';
        if (type === 'audio') return 'from-purple-400/30 to-purple-700/30';
        if (type === 'document') return 'from-green-400/30 to-green-700/30';
        return 'from-gray-400/30 to-gray-600/30';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen pb-24 md:pb-8 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky top-0 z-20 glass-premium p-4 border-b border-border",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold",
                                children: "Files & Media"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/files-section.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: isSelectMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            variant: "ghost",
                                            onClick: selectAll,
                                            className: "text-xs rounded-full",
                                            children: selectedFiles.size === filteredFiles.length ? 'Deselect All' : 'Select All'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 144,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            variant: "destructive",
                                            onClick: deleteSelected,
                                            disabled: selectedFiles.size === 0,
                                            className: "text-xs rounded-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "w-3 h-3 mr-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 19
                                                }, this),
                                                " Delete (",
                                                selectedFiles.size,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 147,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            variant: "ghost",
                                            onClick: clearSelection,
                                            className: "text-xs rounded-full",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "w-3 h-3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/files-section.tsx",
                                                lineNumber: 151,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 150,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            variant: "ghost",
                                            onClick: ()=>setIsSelectMode(true),
                                            className: "text-xs rounded-full",
                                            children: "Select"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 156,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                                            open: showUploadDialog,
                                            onOpenChange: setShowUploadDialog,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTrigger"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        size: "sm",
                                                        className: "rounded-full bg-honey text-background hover:bg-honey/90 text-xs",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                                className: "w-3 h-3 mr-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/sections/files-section.tsx",
                                                                lineNumber: 167,
                                                                columnNumber: 23
                                                            }, this),
                                                            " Upload"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/sections/files-section.tsx",
                                                        lineNumber: 166,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                                                    className: "glass-card border-border",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                                                className: "text-gradient-honey",
                                                                children: "Upload File"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/sections/files-section.tsx",
                                                                lineNumber: 172,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center gap-3 hover:border-honey/50 transition-colors cursor-pointer",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                                    className: "w-10 h-10 text-muted-foreground"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                                                    lineNumber: 175,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-muted-foreground",
                                                                    children: "Drag & drop files here"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                                                    lineNumber: 176,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-muted-foreground",
                                                                    children: "or click to browse"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                                                    lineNumber: 177,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    size: "sm",
                                                                    className: "rounded-full bg-honey/20 text-honey text-xs mt-2",
                                                                    children: "Choose Files"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                                                    lineNumber: 178,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                                            lineNumber: 174,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                                    lineNumber: 170,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 164,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/files-section.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/files-section.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-muted-foreground flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$drive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HardDrive$3e$__["HardDrive"], {
                                                className: "w-3 h-3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/files-section.tsx",
                                                lineNumber: 193,
                                                columnNumber: 15
                                            }, this),
                                            " ",
                                            storageUsed,
                                            " GB / ",
                                            storageTotal,
                                            " GB"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/files-section.tsx",
                                        lineNumber: 192,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-muted-foreground",
                                        children: [
                                            Math.round(storagePercent),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/files-section.tsx",
                                        lineNumber: 195,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/files-section.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Progress"], {
                                value: storagePercent,
                                className: "h-1.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/files-section.tsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mt-2",
                                children: storageBreakdown.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-2 h-2 rounded-full', item.color)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/files-section.tsx",
                                                lineNumber: 201,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] text-muted-foreground",
                                                children: [
                                                    item.label,
                                                    " ",
                                                    item.size,
                                                    " GB"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sections/files-section.tsx",
                                                lineNumber: 202,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, item.label, true, {
                                        fileName: "[project]/src/components/sections/files-section.tsx",
                                        lineNumber: 200,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/files-section.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/files-section.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/files-section.tsx",
                                        lineNumber: 211,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value),
                                        placeholder: "Search files...",
                                        className: "pl-8 h-8 text-xs glass-card border-border/50 rounded-xl"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/files-section.tsx",
                                        lineNumber: 212,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/files-section.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "sm",
                                        variant: "ghost",
                                        onClick: ()=>setShowSortMenu(!showSortMenu),
                                        className: "h-8 text-xs rounded-xl",
                                        children: [
                                            "Sort ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "w-3 h-3 ml-1"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/files-section.tsx",
                                                lineNumber: 226,
                                                columnNumber: 20
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/files-section.tsx",
                                        lineNumber: 220,
                                        columnNumber: 13
                                    }, this),
                                    showSortMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-0 top-full mt-1 w-32 glass-card rounded-xl border border-border p-1 z-30",
                                        children: [
                                            'newest',
                                            'oldest',
                                            'largest',
                                            'smallest',
                                            'name'
                                        ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setSortBy(opt);
                                                    setShowSortMenu(false);
                                                },
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full text-left px-3 py-1.5 text-xs rounded-lg capitalize transition-colors', sortBy === opt ? 'bg-honey/20 text-honey' : 'hover:bg-accent/30'),
                                                children: [
                                                    opt === sortBy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                        className: "w-3 h-3 inline mr-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/files-section.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 40
                                                    }, this),
                                                    opt
                                                ]
                                            }, opt, true, {
                                                fileName: "[project]/src/components/sections/files-section.tsx",
                                                lineNumber: 231,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/files-section.tsx",
                                        lineNumber: 229,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/files-section.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex glass-card rounded-lg p-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setViewMode('grid'),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('p-1.5 rounded-md transition-colors', viewMode === 'grid' ? 'bg-honey/20 text-honey' : 'text-muted-foreground'),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3X3$3e$__["Grid3X3"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 251,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/files-section.tsx",
                                        lineNumber: 247,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setViewMode('list'),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('p-1.5 rounded-md transition-colors', viewMode === 'list' ? 'bg-honey/20 text-honey' : 'text-muted-foreground'),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 257,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/files-section.tsx",
                                        lineNumber: 253,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/files-section.tsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/files-section.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
                        value: activeTab,
                        onValueChange: (v)=>setActiveTab(v),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsList"], {
                            className: "glass-card w-full h-9 rounded-xl",
                            children: [
                                'all',
                                'images',
                                'videos',
                                'documents',
                                'links',
                                'voice'
                            ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                    value: tab,
                                    className: "text-[10px] rounded-lg capitalize data-[state=active]:bg-honey/20 data-[state=active]:text-honey",
                                    children: tab
                                }, tab, false, {
                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                    lineNumber: 266,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/files-section.tsx",
                            lineNumber: 264,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/files-section.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/files-section.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4",
                children: filteredFiles.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center justify-center py-16 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderOpen$3e$__["FolderOpen"], {
                            className: "w-12 h-12 text-muted-foreground/30 mb-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/files-section.tsx",
                            lineNumber: 278,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground",
                            children: "No files found"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/files-section.tsx",
                            lineNumber: 279,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-muted-foreground mt-1",
                            children: "Upload or change filters"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/files-section.tsx",
                            lineNumber: 280,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/files-section.tsx",
                    lineNumber: 277,
                    columnNumber: 11
                }, this) : viewMode === 'grid' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2",
                    children: filteredFiles.map((file)=>{
                        const isImageIcon = file.type.startsWith('image');
                        const isSelected = selectedFiles.has(file.id);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            whileHover: {
                                scale: 1.03
                            },
                            whileTap: {
                                scale: 0.97
                            },
                            onClick: ()=>isSelectMode ? toggleSelect(file.id) : setPreviewFile(file),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all', isSelected ? 'border-honey shadow-honey' : 'border-transparent'),
                            children: [
                                isImageIcon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full h-full bg-gradient-to-br', getFileColor(file.type), 'flex items-center justify-center'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__["ImageIcon"], {
                                        className: "w-6 h-6 text-honey/60"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/files-section.tsx",
                                        lineNumber: 300,
                                        columnNumber: 23
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                    lineNumber: 299,
                                    columnNumber: 21
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full h-full bg-gradient-to-br flex flex-col items-center justify-center gap-1', getFileColor(file.type)),
                                    children: [
                                        (()=>{
                                            const Icon = getFileIcon(file.type);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                className: "w-6 h-6 text-muted-foreground/60"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/files-section.tsx",
                                                lineNumber: 304,
                                                columnNumber: 77
                                            }, this);
                                        })(),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: "text-[8px] px-1 bg-background/50",
                                            children: getFileTypeBadge(file.type)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 305,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                    lineNumber: 303,
                                    columnNumber: 21
                                }, this),
                                isSelectMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('absolute top-1 right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all', isSelected ? 'bg-honey border-honey' : 'border-white/50 bg-black/30'),
                                    children: isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        className: "w-3 h-3 text-background"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/files-section.tsx",
                                        lineNumber: 313,
                                        columnNumber: 38
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                    lineNumber: 309,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, file.id, true, {
                            fileName: "[project]/src/components/sections/files-section.tsx",
                            lineNumber: 288,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/files-section.tsx",
                    lineNumber: 283,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: filteredFiles.map((file)=>{
                        const Icon = getFileIcon(file.type);
                        const isSelected = selectedFiles.has(file.id);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            whileHover: {
                                scale: 1.01
                            },
                            onClick: ()=>isSelectMode ? toggleSelect(file.id) : setPreviewFile(file),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-3 p-3 glass-card rounded-xl cursor-pointer transition-all', isSelected && 'border-honey shadow-honey'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center shrink-0', getFileColor(file.type)),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/files-section.tsx",
                                        lineNumber: 336,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                    lineNumber: 335,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium truncate",
                                            children: file.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 339,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-[10px] text-muted-foreground",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: getFileTypeBadge(file.type)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFileSize"])(file.size)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                                    lineNumber: 342,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRelativeTime"])(file.uploadedAt)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                                    lineNumber: 343,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 340,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                    lineNumber: 338,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "p-1.5 rounded-lg hover:bg-accent/30 transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                className: "w-3.5 h-3.5 text-muted-foreground"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/files-section.tsx",
                                                lineNumber: 348,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 347,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "p-1.5 rounded-lg hover:bg-accent/30 transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                                className: "w-3.5 h-3.5 text-muted-foreground"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/files-section.tsx",
                                                lineNumber: 351,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 350,
                                            columnNumber: 21
                                        }, this),
                                        isSelectMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-5 h-5 rounded-full border-2 flex items-center justify-center ml-1', isSelected ? 'bg-honey border-honey' : 'border-muted-foreground'),
                                            children: isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                className: "w-3 h-3 text-background"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/files-section.tsx",
                                                lineNumber: 358,
                                                columnNumber: 40
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 354,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                    lineNumber: 346,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, file.id, true, {
                            fileName: "[project]/src/components/sections/files-section.tsx",
                            lineNumber: 326,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/files-section.tsx",
                    lineNumber: 321,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/files-section.tsx",
                lineNumber: 275,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: !!previewFile,
                onOpenChange: ()=>setPreviewFile(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "glass-card border-border max-w-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                children: previewFile?.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/files-section.tsx",
                                lineNumber: 373,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/files-section.tsx",
                            lineNumber: 372,
                            columnNumber: 11
                        }, this),
                        previewFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full aspect-video rounded-xl bg-gradient-to-br flex items-center justify-center', getFileColor(previewFile.type)),
                                    children: (()=>{
                                        const Icon = getFileIcon(previewFile.type);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: "w-16 h-16 text-muted-foreground/40"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 381,
                                            columnNumber: 78
                                        }, this);
                                    })()
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                    lineNumber: 377,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 text-sm text-muted-foreground w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: getFileTypeBadge(previewFile.type)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 384,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFileSize"])(previewFile.size)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 385,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRelativeTime"])(previewFile.uploadedAt)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 386,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                    lineNumber: 383,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            className: "rounded-full bg-honey text-background",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                    className: "w-4 h-4 mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                                    lineNumber: 390,
                                                    columnNumber: 19
                                                }, this),
                                                " Download"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 389,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            variant: "outline",
                                            className: "rounded-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                                    className: "w-4 h-4 mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                                    lineNumber: 393,
                                                    columnNumber: 19
                                                }, this),
                                                " Share"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 392,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            variant: "destructive",
                                            className: "rounded-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "w-4 h-4 mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                                    lineNumber: 396,
                                                    columnNumber: 19
                                                }, this),
                                                " Delete"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/files-section.tsx",
                                            lineNumber: 395,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/files-section.tsx",
                                    lineNumber: 388,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/files-section.tsx",
                            lineNumber: 376,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/files-section.tsx",
                    lineNumber: 371,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/files-section.tsx",
                lineNumber: 370,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/files-section.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
_s(FilesSection, "YuyTZBraLhlj9imnsIbGNeNDGfI=");
_c = FilesSection;
var _c;
__turbopack_context__.k.register(_c, "FilesSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_11004bb6._.js.map