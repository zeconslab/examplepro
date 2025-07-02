export default {
  rules: {
    "no-duplicate-tailwind-class": {
      meta: {
        type: "problem",
        docs: {
          description: "Detecta clases duplicadas en atributos class",
        },
        schema: [],
      },
      create(context) {
        return {
          JSXAttribute(node) {
            if (
              node.name &&
              node.name.name === "className" &&
              node.value &&
              node.value.type === "Literal"
            ) {
              const classList = node.value.value.split(/\s+/);
              const seen = new Set();
              const duplicates = classList.filter((cls) => {
                if (seen.has(cls)) return true;
                seen.add(cls);
                return false;
              });
              if (duplicates.length > 0) {
                context.report({
                  node,
                  message: `Clases duplicadas detectadas: ${duplicates.join(", ")}`,
                });
              }
            }
          },
          // Para HTML: busca atributos class="..."
          Literal(node) {
            if (
              typeof node.value === "string" &&
              node.value.includes('class="')
            ) {
              // Extrae todas las ocurrencias de class="..."
              const regex = /class\s*=\s*"([^"]+)"/g;
              let match;
              while ((match = regex.exec(node.value)) !== null) {
                const classList = match[1].split(/\s+/);
                const seen = new Set();
                const duplicates = classList.filter((cls) => {
                  if (seen.has(cls)) return true;
                  seen.add(cls);
                  return false;
                });
                if (duplicates.length > 0) {
                  context.report({
                    node,
                    message: `Clases duplicadas detectadas: ${duplicates.join(", ")}`,
                  });
                }
              }
            }
          },
        };
      },
    },
  },
};