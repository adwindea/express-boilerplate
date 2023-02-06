import { Ability } from "@casl/ability";

const defineAbility = (req, res, next) => {
    if (req.user) {
        req.ability = new Ability(req.user.permissions);
    }
}

export default defineAbility;