'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var language = require('@codemirror/language');
var lr = require('@lezer/lr');
var highlight = require('@lezer/highlight');

// This file was generated by lezer-generator. You probably shouldn't edit it.
const indent = 30,
  LineText1 = 1,
  LineText2 = 2,
  LineText3 = 3,
  LineText4 = 4,
  LineText5 = 5,
  newline$1 = 31,
  newlineEmpty = 32;

const LineTextTokens = [LineText1, LineText2, LineText3, LineText4, LineText5];
const newline = 10, carriageReturn = 13, space = 32, tab = 9, hash = 35, colon = 58, parenL = 40, parenR = 41, bracketL = 91, bracketR = 93, braceL = 123, braceR = 125;
const newlines = new lr.ExternalTokenizer((input, _stack) => {
    if (input.next < 0)
        return;
    else {
        input.advance();
        let spaces = 0;
        while (input.next == space || input.next == tab) {
            input.advance();
            spaces++;
        }
        let empty = input.next == newline ||
            input.next == carriageReturn ||
            input.next == hash;
        input.acceptToken(empty ? newlineEmpty : newline$1, -spaces);
    }
}, { contextual: true, fallback: true });
const lineTextType = new lr.ExternalTokenizer((input, stack) => {
    let chars = 0;
    while (input.next > -1 && input.next !== newline) {
        if (input.next === colon)
            return;
        if (input.next === parenL ||
            input.next === bracketL ||
            input.next === braceL) {
            if (chars > 0) {
                input.acceptToken(stack.context.lineType);
                return;
            }
            else
                return;
        }
        if ((input.next === parenR ||
            input.next === bracketR ||
            input.next === braceR) &&
            chars > 0) {
            input.acceptToken(stack.context.lineType);
            return;
        }
        input.advance();
        chars++;
    }
    input.acceptToken(stack.context.lineType);
});
const indentation = new lr.ExternalTokenizer((input, _stack) => {
    let prev = input.peek(-1);
    if (prev == newline || prev == carriageReturn) {
        while (true) {
            if (input.next == space)
                ;
            else if (input.next == tab)
                ;
            else
                break;
            input.advance();
        }
        if (input.next != newline &&
            input.next != carriageReturn &&
            input.next != hash) {
            input.acceptToken(indent);
        }
    }
});
const indentTracker = {
    lineType: LineText1,
};
const countIndent = (space) => {
    let depth = 0;
    for (let i = 0; i < space.length; i++)
        depth += space.charCodeAt(i) == tab ? 8 - (depth % 8) : 1;
    return depth;
};
const getLineType = (depth) => {
    return LineTextTokens[depth % 5];
};
const trackIndent = new lr.ContextTracker({
    start: indentTracker,
    shift(context, term, stack, input) {
        if (term === indent) {
            const depth = countIndent(input.read(input.pos, stack.pos));
            context.lineType = getLineType(depth);
        }
        return context;
    },
});

const mindmapTags = {
    diagramName: highlight.Tag.define(),
    lineText1: highlight.Tag.define(),
    lineText2: highlight.Tag.define(),
    lineText3: highlight.Tag.define(),
    lineText4: highlight.Tag.define(),
    lineText5: highlight.Tag.define(),
};

const mindmapHighlighting = highlight.styleTags({
    DiagramName: mindmapTags.diagramName,
    LineText1: mindmapTags.lineText1,
    LineText2: mindmapTags.lineText2,
    LineText3: mindmapTags.lineText3,
    LineText4: mindmapTags.lineText4,
    LineText5: mindmapTags.lineText5,
});

// This file was generated by lezer-generator. You probably shouldn't edit it.
const spec_word = {__proto__:null,mindmap:72, icon:76};
const parser = lr.LRParser.deserialize({
  version: 14,
  states: "&fOYQ[OOOOQW'#Cw'#CwQbQ[OOQgQ[OOOOQW'#Cc'#CcOOQW-E6u-E6uOlQ]O'#CdOOQW'#Cx'#CxQgQ[OOO!]Q^O,59OOOQW-E6v-E6vOOQW'#DR'#DRO!vQ[O'#CgO!{Q^O'#CjO!{Q^O'#CmO!{Q^O'#CnO!{Q^O'#CqO!{Q^O'#CrO!{Q^O'#CsO!{Q^O'#CvOOQW'#DU'#DUO#^Q[O1G.jOOQW1G.j1G.jO#hQ[O,59ROOQW'#Ch'#ChOOQW,59U,59UO#mQ[O,59XO#rQ[O,59YO#wQ[O,59]O#|Q[O,59^O$RQ[O,59_O$WQ[O,59bOOQW7+$U7+$UO!{Q^O1G.mOOQW1G.s1G.sOOQW1G.t1G.tOOQW1G.w1G.wOOQW1G.x1G.xOOQW1G.y1G.yOOQW1G.|1G.|O$]Q[O7+$XOOQW<<Gs<<Gs",
  stateData: "$b~OrOSpOS~OoPOtSO~OoPO~OoUO~OnXOmWXoWX~OXbO]_O`^OcaOd`OicO~OPZOQZORZOSZOTZOY[Ow]O~PwOvhO~OPZOQZORZOSZOTZO~OmWioWi~PwO]qO~O_rO~OXsO~OctO~OduO~O]vO~OhwO~OXyO~O",
  goto: "#[yPPPPPPPz}PP!R!UP!RPP!X!XPP!X!X!XPP!X!]!cPPPPPPPP!iPP#URROTVRWRfXRg[TdXeQQORTQQWRRYWQeXQi]Qj^Qk_Ql`QmaQnbQocRxqQfXRpe",
  nodeNames: "⚠ LineText1 LineText2 LineText3 LineText4 LineText5 MindmapDiagram DiagramName Line ) :: IconLine Icon ( ClassLine ] [ Square RoundedSquare )) (( Circle Bang Cloud }} {{ Hexagon",
  maxTerm: 40,
  context: trackIndent,
  nodeProps: [
    ["openedBy", 9,"(",15,"[",19,"((",24,"{{"],
    ["closedBy", 13,")",16,"]",20,"))",25,"}}"]
  ],
  propSources: [mindmapHighlighting],
  skippedNodes: [0],
  repeatNodeCount: 2,
  tokenData: "$b~R]XYz[]zpqzxy!fyz!s![!]#Q!c!}#e!}#O#p#O#P!]#P#Q#u#T#o#e#o#p#z#q#r$V~!PSr~XYz[]zpqz#O#P!]~!`QYZz]^z~!kP]~xy!n~!sOd~~!xPX~yz!{~#QOc~~#TP![!]#W~#]PY~![!]#`~#eOw~~#jQs~!c!}#e#T#o#e~#uO`~~#zO_~~#}P#o#p$Q~$VOi~~$YP#q#r$]~$bOh~",
  tokenizers: [indentation, lineTextType, 0, newlines],
  topRules: {"MindmapDiagram":[0,6]},
  specialized: [{term: 35, get: value => spec_word[value] || -1}],
  tokenPrec: 0
});

const mindmapLanguage = language.LRLanguage.define({
    name: 'mindmap',
    parser: parser,
});
function mindmap() {
    return new language.LanguageSupport(mindmapLanguage);
}

exports.mindmap = mindmap;
exports.mindmapLanguage = mindmapLanguage;
exports.mindmapTags = mindmapTags;
