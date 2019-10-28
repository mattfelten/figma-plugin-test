figma.showUI(__html__);

function replaceComponent(node) {
	console.log( "Master Component:" + node.masterComponent.name );
	console.log( node.masterComponent );
}

function traverse(node) {
	if ("children" in node) {
		if (node.masterComponent) {
			replaceComponent(node);
		}

		if (node.type !== "INSTANCE") {
			for (const child of node.children) {
				traverse(child)
			}
		}
	}
}

figma.ui.onmessage = msg => {
  if (msg.type === 'create-rectangles') {
    const nodes = []

    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle()
      rect.x = i * 150
      rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}]
      figma.currentPage.appendChild(rect)
      nodes.push(rect)
    }

    figma.currentPage.selection = nodes
	figma.viewport.scrollAndZoomIntoView(nodes)

	figma.closePlugin()
  }

  if (msg.type === 'convert-wireframe') {
    traverse(figma.root)
  }
}
