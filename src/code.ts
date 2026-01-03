figma.showUI(__html__, { width: 340, height: 411 });

(async () => {
  // select last selected from/to language
  figma.ui.postMessage({
    type: "fromLanguage",
    value: await figma.clientStorage.getAsync("fromLanguage"),
  });
  figma.ui.postMessage({
    type: "toLanguage",
    value: await figma.clientStorage.getAsync("toLanguage"),
  });
})();

figma.ui.onmessage = async (msg) => {
  // translating selection in figma
  if (msg.type === "translate") {
    const selection = figma.currentPage.selection;
    for (const node of selection) {
      resolveChildren(node, msg);
    }
  }

  // save last selected from language
  if (msg.type === "updateFromLanguage") {
    figma.clientStorage.setAsync("fromLanguage", msg.value);
  }

  // save last selected to language
  if (msg.type === "updateToLanguage") {
    figma.clientStorage.setAsync("toLanguage", msg.value);
  }
};

async function resolveChildren(node: SceneNode, msg: any) {
  if (node.type === "TEXT") {
    const text = node.characters;
    if (isContainCharacter(text)) {
      await figma.loadFontAsync(node.fontName as FontName);
      node.characters = await translate(text, msg.source, msg.target);
    }
  }
  if ("children" in node) {
    for (const children of node.children) {
      resolveChildren(children, msg);
    }
  }
}

function isContainCharacter(text: string) {
  return /[^0-9 ]/gi.test(text);
}

async function translate(
  text: string,
  source: string,
  target: string
): Promise<string> {
  const translated = text; // call your translator api
  console.log({
    text,
    translated,
    source,
    target,
  });
  return translated;
}
