const Objectif = require('../models/Objectif');
const userService = require('../services/userService');


const objectifService = {
        async createObjectif({ user, poidsObj,  poidsParSemaine, actPhysique }) {
            const userFound = await userService.getUserById(user);
        
                const oldObjectif = await Objectif.findOne({ user });
                if (oldObjectif) {
                    throw new Error('Objectif already exists');
                }
            
            let BMR=0;
            if(userFound.sex=="Male"){
                 BMR= 10*poidsObj + 6.25*userFound.taille - 5*userFound.age + 5;
            }
            else {
                 BMR= 10*poidsObj + 6.25*userFound.taille - 5*userFound.age - 161;
            }

            var duree=0;
            var calories=0;
            let TDEE= BMR ;
                switch(actPhysique){
                    case "Sedentary":
                        TDEE*=1.2;
                        break;
                    case "Moderately active":
                        TDEE*=1.375;
                        break;
                    case "Active":
                        TDEE*=1.55;
                        break;
                    case "Very active":
                        TDEE*=1.725;
                        break;
                }
                const plusOuMoinsCaloriesParJour= (poidsParSemaine*3500)/7;
                

                if(userFound.poids>poidsObj){
                     duree= ((userFound.poids-poidsObj)/poidsParSemaine)*7;
                     calories= TDEE-plusOuMoinsCaloriesParJour;
                }
                else if(userFound.poids<poidsObj) {
                     duree= ((poidsObj-userFound.poids)/poidsParSemaine)*7;
                     calories= TDEE+plusOuMoinsCaloriesParJour;
                }
        
            const objectif = await Objectif.create({
                user,
                poidsObj,
                date: Date.now(),
                duree:duree,
                actPhysique,
                poidsParSemaine,
                calories:calories
            });
            return objectif;
        
        
        },
        async getObjectifByUserId(userId) {
            const objectif = await Objectif.findOne({ user: userId });
            if (!objectif) {
                throw new Error('Objectif not found');
            }
            return objectif;
        }
        ,
        async updateObjectif(
            id,
            data
        ) {
            const objectif = await Objectif.findById(id);
            if (!objectif) {
                throw new Error('Objectif not found');
            }
            const updatedObjectif = await Objectif.findByIdAndUpdate(id, data, { new: true });
            return updatedObjectif;
        },
        
        
        
}
module.exports = objectifService;