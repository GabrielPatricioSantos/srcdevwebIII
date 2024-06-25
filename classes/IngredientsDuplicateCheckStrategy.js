const DuplicateCheckStrategy = require('./DuplicateCheckStrategy');

// classe concreta "implementa" DuplicateCheckStrategy (interface)
class IngredientsDuplicateCheckStrategy extends DuplicateCheckStrategy {
    checkDuplicates(recipe) {
        const seen = {};
        let hasDuplicate = false;

        for (const ingrediente of recipe) {
            const key = `${ingrediente.ID_Ingrediente}`;

            if (seen[key]) {
                hasDuplicate = true;
                break;
            } else {
                seen[key] = true;
            }
        }

        return hasDuplicate;
    }
}

module.exports = IngredientsDuplicateCheckStrategy;
