$.namespace("common.RealGridTheme");

common.RealGridTheme = {

	/* 
	 * theme list
	 * 1. generalBlueSkin
	 * 2. blueSkySkin
	 */
	generalBlueSkin : {
	    "grid": {
	        "background": "#ffffffff",
	        "iconLocation": "left",
	        "border": "#ff999999,1",// border
	        "iconAlignment": "center",
	        "borderBottom": "#ffc9ced3,1",
	        "iconPadding": "0",
	        "selectedBackground": "#ff696969",
	        "contentFit": "auto",
	        "inactiveBackground": "#ffd3d3d3",
	        "iconOffset": "0",
	        "selectionDisplay": "mask",
	        "hoveredMaskBackground": "#1f5292f7",
	        "hoveredMaskBorder": "#335292f7,1",
	        "fontBold": "false",
	        "paddingRight": "2",
	        "paddingBottom": "2",
	        "paddingTop": "2",
	        "figureBackground": "#ff4a88d2",
	        "selectedForeground": "#ffffffff",
	        "foreground": "#ff000000",
	        "inactiveForeground": "#ff808080",
	        "line": "#ffa1adbb,1",
	        "textAlignment": "center",
	        "lineAlignment": "center",
	        "iconIndex": "0"
	    },
	    "panel": {
	        "background": "#ffdee2e7",
	        "paddingRight": "2",
	        "iconLocation": "left",
	        "border": "#ff313539,1",
	        "selectedForeground": "#ffffffff",
	        "iconAlignment": "center",
	        "foreground": "#ff787878",
	        "inactiveForeground": "#ff808080",
	        "borderBottom": "#ff688caf,1",
	        "textAlignment": "near",
	        "selectedBackground": "#ff696969",
	        "lineAlignment": "center",
	        "inactiveBackground": "#ffd3d3d3",
	        "iconOffset": "0",
	        "selectionDisplay": "mask",
	        "hoveredMaskBorder": "#335292f7,1",
	        "iconPadding": "0",
	        "hoveredMaskBackground": "#1f5292f7",
	        "contentFit": "auto",
	        "paddingTop": "4",
	        "borderRight": "#ff777777,1",
	        "figureBackground": "#ff008800",
	        "paddingBottom": "5",
	        "iconIndex": "0"
	    },
	    "body": {
	        "background": "#ffffffff",
	        "iconLocation": "left",
	        "border": "#ff313539,1",
	        "iconAlignment": "center",
	        "borderBottom": "#ffdedede,1",
	        "iconPadding": "0",
	        "selectedBackground": "#ff696969",
	        "contentFit": "auto",
	        "inactiveBackground": "#ffd3d3d3",
	        "iconOffset": "0",
	        "selectionDisplay": "mask",
	        "hoveredMaskBackground": "#1f5292f7",
	        "hoveredMaskBorder": "#335292f7,1",
	        "paddingRight": "2",
	        "paddingBottom": "2",
	        "paddingTop": "2",
	        "figureBackground": "#ff008800",
	        "selectedForeground": "#ffffffff",
	        "foreground": "#ff666666",
	        "inactiveForeground": "#ff808080",
	        "line": "#ff808080,1",
	        "textAlignment": "center",
	        "lineAlignment": "center",
	        "borderRight": "#ffdedede,1",
	        "iconIndex": "0",
	        "empty": {}
	    },
	    "fixed": {
	        "background": "#ffd3d3d3",
	        "paddingRight": "2",
	        "iconLocation": "left",
	        "border": "#88888888,1",
	        "selectedForeground": "#ffffffff",
	        "iconAlignment": "center",
	        "foreground": "#ff000000",
	        "inactiveForeground": "#ff808080",
	        "borderBottom": "#ff999999,1",
	        "textAlignment": "center",
	        "selectedBackground": "#ff696969",
	        "lineAlignment": "center",
	        "inactiveBackground": "#ffd3d3d3",
	        "iconOffset": "0",
	        "selectionDisplay": "mask",
	        "hoveredMaskBorder": "#335292f7,1",
	        "iconPadding": "0",
	        "hoveredMaskBackground": "#1f5292f7",
	        "contentFit": "auto",
	        "paddingTop": "2",
	        "borderRight": "#ff999999,1",
	        "figureBackground": "#ff008800",
	        "paddingBottom": "2",
	        "iconIndex": "0",
	        "colBar": {
	            "background": "#ffffffff",
	            "paddingRight": "2",
	            "iconLocation": "left",
	            "border": "#ff313539,1",
	            "selectedForeground": "#ffffffff",
	            "iconAlignment": "center",
	            "foreground": "#ff000000",
	            "inactiveForeground": "#ff808080",
	            "borderBottom": "#ff808080,1",
	            "textAlignment": "center",
	            "selectedBackground": "#ff696969",
	            "lineAlignment": "center",
	            "inactiveBackground": "#ffd3d3d3",
	            "iconOffset": "0",
	            "selectionDisplay": "mask",
	            "hoveredMaskBorder": "#335292f7,1",
	            "iconPadding": "0",
	            "hoveredMaskBackground": "#1f5292f7",
	            "contentFit": "auto",
	            "paddingTop": "2",
	            "borderRight": "#ff808080,1",
	            "figureBackground": "#ff008800",
	            "paddingBottom": "2",
	            "iconIndex": "0",
	            "borderLeft": "#ff808080,1"
	        },
	        "rowBar": {
	            "background": "#ffd3d3d3",
	            "paddingRight": "2",
	            "iconLocation": "left",
	            "border": "#88888888,1",
	            "selectedForeground": "#ffffffff",
	            "iconAlignment": "center",
	            "foreground": "#ff000000",
	            "inactiveForeground": "#ff808080",
	            "borderBottom": "#ff999999,1",
	            "textAlignment": "center",
	            "selectedBackground": "#ff696969",
	            "lineAlignment": "center",
	            "inactiveBackground": "#ffd3d3d3",
	            "iconOffset": "0",
	            "selectionDisplay": "mask",
	            "hoveredMaskBorder": "#335292f7,1",
	            "iconPadding": "0",
	            "hoveredMaskBackground": "#1f5292f7",
	            "contentFit": "auto",
	            "paddingTop": "2",
	            "borderRight": "#ff999999,1",
	            "figureBackground": "#ff008800",
	            "paddingBottom": "2",
	            "iconIndex": "0"
	        }
	    },
	    "header": {
	        "background": "linear,#ffe9f0f8,#ffc3d8f1,90",
	        "iconLocation": "left",
	        "border": "#ff313539,1",
	        "iconAlignment": "center",
	        "borderBottom": "#ff5d8cc9,1",
	        "borderTop": "#ffffffff,1",
	        "selectedBackground": "linear,#ffbac3ce,#ffaebccc,90",
	        "contentFit": "auto",
	        "inactiveBackground": "#ffd3d3d3",
	        "iconOffset": "0",
	        "selectionDisplay": "inversion",
	        "iconPadding": "0",
	        "hoveredMaskBackground": "linear,#fffff8a9,#ffffd75e,90",
	        "hoveredMaskBorder": "#ffff0000,1",
	        "fontBold": "true",
	        "figureBackground": "#ff000000",
	        "paddingBottom": "2",
	        "paddingTop": "2",
	        "paddingRight": "2",
	        "selectedForeground": "#ff002f6e",
	        "foreground": "#ff002f6e",
	        "inactiveForeground": "#ff808080",
	        "textAlignment": "center",
	        "borderLeft": "#ffffffff,1",
	        "lineAlignment": "center",
	        "borderRight": "#ff5d8cc9,1",
	        "iconIndex": "0",
	        "group": {
	            "background": "linear,#ffe9f0f8,#ffc3d8f1,90",
	            "iconLocation": "left",
	            "border": "#ff313539,1",
	            "iconAlignment": "center",
	            "borderBottom": "#ff5d8cc9,1",
	            "borderTop": "#ffffffff,1",
	            "selectedBackground": "#ff696969",
	            "contentFit": "auto",
	            "inactiveBackground": "#ffd3d3d3",
	            "iconOffset": "0",
	            "selectionDisplay": "mask",
	            "iconPadding": "0",
	            "hoveredMaskBackground": "linear,#fffff8a9,#ffffd75e,90",
	            "hoveredMaskBorder": "#335292f7,1",
	            "fontBold": "true",
	            "figureBackground": "#ff008800",
	            "paddingBottom": "2",
	            "paddingTop": "2",
	            "paddingRight": "2",
	            "selectedForeground": "#ffffffff",
	            "foreground": "#ff002f6e",
	            "inactiveForeground": "#ff808080",
	            "textAlignment": "center",
	            "borderLeft": "#ffffffff,1",
	            "lineAlignment": "center",
	            "borderRight": "#ff5d8cc9,1",
	            "iconIndex": "0"
	        }
	    },
	    "footer": {
	        "background": "#ffdee2e7",
	        "iconLocation": "left",
	        "border": "#88888888,1",
	        "iconAlignment": "center",
	        "iconOffset": "0",
	        "borderTop": "#ff79828b,1",
	        "selectedBackground": "#ff696969",
	        "contentFit": "auto",
	        "inactiveBackground": "#ffd3d3d3",
	        "selectionDisplay": "mask",
	        "iconPadding": "0",
	        "hoveredMaskBackground": "#1f5292f7",
	        "hoveredMaskBorder": "#335292f7,1",
	        "paddingRight": "2",
	        "paddingBottom": "1",
	        "paddingTop": "2",
	        "figureBackground": "#ff008800",
	        "selectedForeground": "#ffffffff",
	        "foreground": "#ff000000",
	        "inactiveForeground": "#ff808080",
	        "textAlignment": "near",
	        "borderLeft": "#ffffffff,1",
	        "lineAlignment": "center",
	        "borderRight": "#ff9099a3,1",
	        "iconIndex": "0"
	    },
	    "rowGroup": {
	        "header": {
	            "background": "#ffd7e6f7",
	            "iconLocation": "left",
	            "border": "#ff313539,0",
	            "iconAlignment": "center",
	            "borderBottom": "#ff85a8d0,1",
	            "borderTop": "#ffffffff,1",
	            "selectedBackground": "#ff696969",
	            "contentFit": "auto",
	            "inactiveBackground": "#ffd3d3d3",
	            "iconOffset": "0",
	            "selectionDisplay": "mask",
	            "iconPadding": "0",
	            "hoveredMaskBackground": "#1f5292f7",
	            "hoveredMaskBorder": "#335292f7,1",
	            "figureBackground": "#ff008800",
	            "paddingBottom": "2",
	            "paddingTop": "2",
	            "paddingRight": "2",
	            "selectedForeground": "#ffffffff",
	            "foreground": "#ff002f6e",
	            "inactiveForeground": "#ff808080",
	            "textAlignment": "near",
	            "borderLeft": "#ffffffff,1",
	            "lineAlignment": "center",
	            "borderRight": "#ff85a8d0,1",
	            "iconIndex": "0"
	        },
	        "footer": {
	            "background": "#ff9cbade",
	            "iconLocation": "left",
	            "border": "#ffffffff,0",
	            "iconAlignment": "center",
	            "borderBottom": "#ffffffff,0",
	            "borderTop": "#ffd8e3f0,1",
	            "selectedBackground": "#ff696969",
	            "contentFit": "auto",
	            "inactiveBackground": "#ffd3d3d3",
	            "iconOffset": "0",
	            "selectionDisplay": "mask",
	            "iconPadding": "0",
	            "hoveredMaskBackground": "#1f5292f7",
	            "hoveredMaskBorder": "#335292f7,1",
	            "figureBackground": "#ff008800",
	            "paddingBottom": "2",
	            "paddingTop": "2",
	            "paddingRight": "4",
	            "selectedForeground": "#ffffffff",
	            "foreground": "#ff000000",
	            "inactiveForeground": "#ff808080",
	            "textAlignment": "far",
	            "borderLeft": "#ffffffff,0",
	            "lineAlignment": "center",
	            "borderRight": "#ffd8e3f0,1",
	            "iconIndex": "0"
	        },
	        "head": {
	            "background": "linear,#ffe9f0f8,#ffc3d8f1,90",
	            "iconLocation": "left",
	            "border": "#ff313539,1",
	            "iconAlignment": "center",
	            "borderBottom": "#ff5d8cc9,1",
	            "borderTop": "#ffffffff,1",
	            "selectedBackground": "#ffff0000",
	            "contentFit": "auto",
	            "inactiveBackground": "#ffd3d3d3",
	            "iconOffset": "0",
	            "selectionDisplay": "inversion",
	            "iconPadding": "0",
	            "hoveredMaskBackground": "linear,#fffff8a9,#ffffd75e,90",
	            "hoveredMaskBorder": "#ffff0000,1",
	            "figureBackground": "#ff000000",
	            "paddingBottom": "2",
	            "paddingTop": "2",
	            "paddingRight": "2",
	            "selectedForeground": "#ffff0000",
	            "foreground": "#ff002f6e",
	            "inactiveForeground": "#ff808080",
	            "textAlignment": "center",
	            "borderLeft": "#ffffffff,1",
	            "lineAlignment": "center",
	            "borderRight": "#ff5d8cc9,1",
	            "iconIndex": "0"
	        },
	        "foot": {
	            "background": "#ffdee2e7",
	            "paddingRight": "2",
	            "iconLocation": "left",
	            "border": "#88888888,1",
	            "selectedForeground": "#ffffffff",
	            "iconAlignment": "center",
	            "foreground": "#ff000000",
	            "inactiveForeground": "#ff808080",
	            "iconOffset": "0",
	            "textAlignment": "near",
	            "selectedBackground": "#ff696969",
	            "lineAlignment": "center",
	            "inactiveBackground": "#ffd3d3d3",
	            "selectionDisplay": "mask",
	            "hoveredMaskBorder": "#335292f7,1",
	            "borderTop": "#ff79828b,1",
	            "hoveredMaskBackground": "#1f5292f7",
	            "contentFit": "auto",
	            "paddingTop": "2",
	            "borderRight": "#ff9099a3,1",
	            "figureBackground": "#ff008800",
	            "iconPadding": "0",
	            "paddingBottom": "1",
	            "iconIndex": "0"
	        },
	        "headerBar": {
	            "background": "#ffd7e6f7",
	            "iconLocation": "left",
	            "border": "#ffffffff,0",
	            "iconAlignment": "center",
	            "borderBottom": "#ffffffff,0",
	            "borderTop": "#ffffffff,1",
	            "selectedBackground": "#ff696969",
	            "contentFit": "auto",
	            "inactiveBackground": "#ffd3d3d3",
	            "iconOffset": "0",
	            "selectionDisplay": "mask",
	            "iconPadding": "0",
	            "hoveredMaskBackground": "#1f5292f7",
	            "hoveredMaskBorder": "#335292f7,1",
	            "figureBackground": "#ff498ee1",
	            "paddingBottom": "2",
	            "paddingTop": "2",
	            "paddingRight": "2",
	            "selectedForeground": "#ffffffff",
	            "foreground": "#ff002f6e",
	            "inactiveForeground": "#ff808080",
	            "textAlignment": "near",
	            "borderLeft": "#ffffffff,1",
	            "lineAlignment": "center",
	            "borderRight": "#ffffffff,0",
	            "iconIndex": "0"
	        },
	        "footerBar": {
	            "background": "#ff9cbade",
	            "iconLocation": "left",
	            "border": "#ffffffff,0",
	            "iconAlignment": "center",
	            "borderBottom": "#ffffffff,0",
	            "borderTop": "#ffd7e6f7,1",
	            "selectedBackground": "#ff696969",
	            "contentFit": "auto",
	            "inactiveBackground": "#ffd3d3d3",
	            "iconOffset": "0",
	            "selectionDisplay": "mask",
	            "iconPadding": "0",
	            "hoveredMaskBackground": "#1f5292f7",
	            "hoveredMaskBorder": "#335292f7,1",
	            "figureBackground": "#ff008800",
	            "paddingBottom": "2",
	            "paddingTop": "2",
	            "paddingRight": "2",
	            "selectedForeground": "#ffffffff",
	            "foreground": "#ff000000",
	            "inactiveForeground": "#ff808080",
	            "textAlignment": "near",
	            "borderLeft": "#ffffffff,0",
	            "lineAlignment": "center",
	            "borderRight": "#ffd7e6f7,1",
	            "iconIndex": "0"
	        },
	        "bar": {
	            "background": "#ffd7e6f7",
	            "iconLocation": "left",
	            "border": "#ff313539,0",
	            "iconAlignment": "center",
	            "borderBottom": "#ff85a8d0,0",
	            "borderTop": "#ffffffff,0",
	            "selectedBackground": "#ff696969",
	            "contentFit": "auto",
	            "inactiveBackground": "#ffd3d3d3",
	            "iconOffset": "0",
	            "selectionDisplay": "mask",
	            "iconPadding": "0",
	            "hoveredMaskBackground": "#1f5292f7",
	            "hoveredMaskBorder": "#335292f7,1",
	            "figureBackground": "#ff008800",
	            "paddingBottom": "2",
	            "paddingTop": "2",
	            "paddingRight": "2",
	            "selectedForeground": "#ffffffff",
	            "foreground": "#ff002f6e",
	            "inactiveForeground": "#ff808080",
	            "textAlignment": "near",
	            "borderLeft": "#ffffffff,1",
	            "lineAlignment": "center",
	            "borderRight": "#ff85a8d0,1",
	            "iconIndex": "0"
	        },
	        "panel": {
	            "background": "#ffd7e6f7",
	            "iconLocation": "left",
	            "border": "#ff5d8cc9,1",
	            "iconAlignment": "center",
	            "borderBottom": "#ff5d8cc9,1",
	            "borderTop": "#ffffffff,1",
	            "selectedBackground": "#ffff0000",
	            "contentFit": "auto",
	            "inactiveBackground": "#ffd3d3d3",
	            "iconOffset": "0",
	            "selectionDisplay": "mask",
	            "iconPadding": "0",
	            "hoveredMaskBackground": "#fffff5a2",
	            "hoveredMaskBorder": "#335292f7,1",
	            "figureBackground": "#ff000000",
	            "paddingBottom": "1",
	            "paddingTop": "1",
	            "paddingRight": "1",
	            "selectedForeground": "#ffff0000",
	            "foreground": "#ff002f6e",
	            "inactiveForeground": "#ff808080",
	            "line": "#ff5d8cc9,1",
	            "textAlignment": "center",
	            "borderLeft": "#ffffffff,1",
	            "lineAlignment": "center",
	            "borderRight": "#ff5d8cc9,1",
	            "iconIndex": "0"
	        }
	    },
	    "indicator": {
	        "background": "#ffebf3fc",
	        "iconLocation": "left",
	        "border": "#ff313539,1",
	        "iconAlignment": "center",
	        "borderBottom": "#ff93a4b9,1",
	        "borderTop": "#ffffffff,1",
	        "selectedBackground": "#fffff0b2",
	        "contentFit": "auto",
	        "inactiveBackground": "#ffd3d3d3",
	        "iconOffset": "0",
	        "selectionDisplay": "mask",
	        "iconPadding": "0",
	        "hoveredMaskBackground": "#fffff0b2",
	        "hoveredMaskBorder": "#335292f7,1",
	        "figureBackground": "#ff1c82ff",
	        "paddingBottom": "2",
	        "paddingTop": "2",
	        "paddingRight": "2",
	        "selectedForeground": "#ffffffff",
	        "foreground": "#ff002f6e",
	        "inactiveForeground": "#ff808080",
	        "textAlignment": "center",
	        "borderLeft": "#ffffffff,1",
	        "lineAlignment": "center",
	        "borderRight": "#ff93a4b9,1",
	        "iconIndex": "0",
	        "head": {
	            "background": "linear,#ffe9f0f8,#ffc3d8f1,90",
	            "iconLocation": "left",
	            "border": "#ff000000,1",
	            "iconAlignment": "center",
	            "borderBottom": "#ff5d8cc9,1",
	            "borderTop": "#ffffffff,1",
	            "selectedBackground": "#ff696969",
	            "contentFit": "auto",
	            "inactiveBackground": "#ffd3d3d3",
	            "iconOffset": "0",
	            "selectionDisplay": "mask",
	            "iconPadding": "0",
	            "hoveredMaskBackground": "#1f5292f7",
	            "hoveredMaskBorder": "#335292f7,1",
	            "figureBackground": "#ff008800",
	            "paddingBottom": "2",
	            "paddingTop": "2",
	            "paddingRight": "2",
	            "selectedForeground": "#ffffffff",
	            "foreground": "#ff000000",
	            "inactiveForeground": "#ff808080",
	            "textAlignment": "center",
	            "borderLeft": "#ffffffff,1",
	            "lineAlignment": "center",
	            "borderRight": "#ff5d8cc9,1",
	            "iconIndex": "0"
	        },
	        "foot": {
	            "background": "#ffdee2e7",
	            "iconLocation": "left",
	            "border": "#88888888,1",
	            "iconAlignment": "center",
	            "borderBottom": "#ffc6c6c6,1",
	            "borderTop": "#ff79828b,1",
	            "selectedBackground": "#ff696969",
	            "contentFit": "auto",
	            "inactiveBackground": "#ffd3d3d3",
	            "iconOffset": "0",
	            "selectionDisplay": "mask",
	            "iconPadding": "0",
	            "hoveredMaskBackground": "#1f5292f7",
	            "hoveredMaskBorder": "#335292f7,1",
	            "figureBackground": "#ff002f6e",
	            "paddingBottom": "2",
	            "paddingTop": "2",
	            "paddingRight": "2",
	            "selectedForeground": "#ffffffff",
	            "foreground": "#ff000000",
	            "inactiveForeground": "#ff808080",
	            "textAlignment": "center",
	            "borderLeft": "#ffffffff,1",
	            "lineAlignment": "center",
	            "borderRight": "#ff9099a3,1",
	            "iconIndex": "0"
	        }
	    },
	    "checkBar": {
	        "background": "#ffffffff",
	        "paddingRight": "2",
	        "iconLocation": "left",
	        "border": "#ff313539,1",
	        "selectedForeground": "#ffffffff",
	        "iconAlignment": "center",
	        "foreground": "#ff555555",
	        "inactiveForeground": "#ff808080",
	        "borderBottom": "#ffaab1b8,1",
	        "textAlignment": "center",
	        "selectedBackground": "#ff696969",
	        "lineAlignment": "center",
	        "inactiveBackground": "#ffd3d3d3",
	        "iconOffset": "0",
	        "selectionDisplay": "mask",
	        "hoveredMaskBorder": "#335292f7,1",
	        "iconPadding": "0",
	        "hoveredMaskBackground": "#1f5292f7",
	        "contentFit": "auto",
	        "paddingTop": "2",
	        "borderRight": "#ffaab1b8,1",
	        "figureBackground": "#ff008e00",
	        "paddingBottom": "2",
	        "iconIndex": "0",
	        "head": {
	            "background": "linear,#ffe9f0f8,#ffc3d8f1,90",
	            "iconLocation": "left",
	            "border": "#ff000000,0",
	            "iconAlignment": "center",
	            "borderBottom": "#ff5d8cc9,1",
	            "borderTop": "#ffffffff,1",
	            "selectedBackground": "#ff696969",
	            "contentFit": "auto",
	            "inactiveBackground": "#ffd3d3d3",
	            "iconOffset": "0",
	            "selectionDisplay": "mask",
	            "iconPadding": "0",
	            "hoveredMaskBackground": "#1f5292f7",
	            "hoveredMaskBorder": "#335292f7,1",
	            "figureBackground": "#ff008e00",
	            "paddingBottom": "2",
	            "paddingTop": "2",
	            "paddingRight": "2",
	            "selectedForeground": "#ffffffff",
	            "foreground": "#ff000000",
	            "inactiveForeground": "#ff808080",
	            "textAlignment": "center",
	            "borderLeft": "#ffffffff,1",
	            "lineAlignment": "center",
	            "borderRight": "#ff5d8cc9,1",
	            "iconIndex": "0"
	        },
	        "foot": {
	            "background": "#ffdee2e7",
	            "iconLocation": "left",
	            "border": "#88888888,1",
	            "iconAlignment": "center",
	            "borderBottom": "#ffc6c6c6,1",
	            "borderTop": "#ff79828b,1",
	            "selectedBackground": "#ff696969",
	            "contentFit": "auto",
	            "inactiveBackground": "#ffd3d3d3",
	            "iconOffset": "0",
	            "selectionDisplay": "mask",
	            "iconPadding": "0",
	            "hoveredMaskBackground": "#1f5292f7",
	            "hoveredMaskBorder": "#335292f7,1",
	            "figureBackground": "#ff008800",
	            "paddingBottom": "2",
	            "paddingTop": "2",
	            "paddingRight": "2",
	            "selectedForeground": "#ffffffff",
	            "foreground": "#ff000000",
	            "inactiveForeground": "#ff808080",
	            "textAlignment": "center",
	            "borderLeft": "#ffffffff,1",
	            "lineAlignment": "center",
	            "borderRight": "#ff9099a3,1",
	            "iconIndex": "0"
	        }
	    },
	    "statusBar": {
	        "background": "#ffffffff",
	        "paddingRight": "2",
	        "iconLocation": "left",
	        "border": "#ff313539,1",
	        "selectedForeground": "#ffffffff",
	        "iconAlignment": "center",
	        "foreground": "#ff000000",
	        "inactiveForeground": "#ff808080",
	        "borderBottom": "#ffaab1b8,1",
	        "textAlignment": "center",
	        "selectedBackground": "#ff696969",
	        "lineAlignment": "center",
	        "inactiveBackground": "#ffd3d3d3",
	        "iconOffset": "0",
	        "selectionDisplay": "mask",
	        "hoveredMaskBorder": "#335292f7,1",
	        "iconPadding": "0",
	        "hoveredMaskBackground": "#1f5292f7",
	        "contentFit": "auto",
	        "paddingTop": "2",
	        "borderRight": "#ffaab1b8,1",
	        "figureBackground": "#ff008800",
	        "paddingBottom": "2",
	        "iconIndex": "0",
	        "head": {
	            "background": "linear,#ffe9f0f8,#ffc3d8f1,90",
	            "iconLocation": "left",
	            "border": "#ff000000,0",
	            "iconAlignment": "center",
	            "borderBottom": "#ff5d8cc9,1",
	            "borderTop": "#ffffffff,1",
	            "selectedBackground": "#ff696969",
	            "contentFit": "auto",
	            "inactiveBackground": "#ffd3d3d3",
	            "iconOffset": "0",
	            "selectionDisplay": "mask",
	            "iconPadding": "0",
	            "hoveredMaskBackground": "#1f5292f7",
	            "hoveredMaskBorder": "#335292f7,1",
	            "figureBackground": "#ff008800",
	            "paddingBottom": "2",
	            "paddingTop": "2",
	            "paddingRight": "2",
	            "figureSize": "1",
	            "selectedForeground": "#ffffffff",
	            "foreground": "#ff000000",
	            "inactiveForeground": "#ff808080",
	            "textAlignment": "center",
	            "borderLeft": "#ffffffff,1",
	            "lineAlignment": "center",
	            "borderRight": "#ff5d8cc9,1",
	            "iconIndex": "0"
	        },
	        "foot": {
	            "background": "#ffdee2e7",
	            "iconLocation": "left",
	            "border": "#88888888,1",
	            "iconAlignment": "center",
	            "borderBottom": "#ffc6c6c6,1",
	            "borderTop": "#ff79828b,1",
	            "selectedBackground": "#ff696969",
	            "contentFit": "auto",
	            "inactiveBackground": "#ffd3d3d3",
	            "iconOffset": "0",
	            "selectionDisplay": "mask",
	            "iconPadding": "0",
	            "hoveredMaskBackground": "#1f5292f7",
	            "hoveredMaskBorder": "#335292f7,1",
	            "figureBackground": "#ff008800",
	            "paddingBottom": "2",
	            "paddingTop": "2",
	            "paddingRight": "2",
	            "selectedForeground": "#ffffffff",
	            "foreground": "#ff000000",
	            "inactiveForeground": "#ff808080",
	            "textAlignment": "center",
	            "borderLeft": "#ffffffff,1",
	            "lineAlignment": "center",
	            "borderRight": "#ff9099a3,1",
	            "iconIndex": "0"
	        }
	    },
	    "selection": {
	        "background": "#2f1e90ff",
	        "paddingRight": "0",
	        "iconLocation": "left",
	        "border": "#5f1e90ff,2",
	        "selectedForeground": "#ffffffff",
	        "iconAlignment": "center",
	        "foreground": "#ff000000",
	        "inactiveForeground": "#ff808080",
	        "iconOffset": "0",
	        "textAlignment": "center",
	        "selectedBackground": "#ff696969",
	        "lineAlignment": "center",
	        "inactiveBackground": "#ffd3d3d3",
	        "selectionDisplay": "mask",
	        "hoveredMaskBorder": "#335292f7,1",
	        "iconPadding": "0",
	        "hoveredMaskBackground": "#1f5292f7",
	        "contentFit": "auto",
	        "paddingTop": "0",
	        "figureBackground": "#ff008800",
	        "paddingBottom": "0",
	        "iconIndex": "0"
	    }
	}

};