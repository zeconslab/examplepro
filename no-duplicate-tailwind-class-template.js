export default {
  rules: {
    "no-duplicate-tailwind-class-template": {
      meta: {
        type: "problem",
        docs: {
          description: "Detecta clases duplicadas en atributos class en templates Angular",
        },
        schema: [],
      },
      create(context) {
        return {
          // Para Angular templates
          BoundAttribute(node) {
            if (node.name === 'class' && node.value && typeof node.value === 'string') {
              const classList = node.value.split(/\s+/);
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
          // Para HTML templates
          TextAttribute(node) {
            if (node.name === 'class' && node.value) {
              const classList = node.value.split(/\s+/);
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
        };
      }
    }
  }
};