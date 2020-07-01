// ## 1. Exercice compter le nombre de restaurants

const resBrooklyn = db.restaurants.find( { borough: "Brooklyn" }, {"name" : 1} ) ;

let count = 0 ;
// on utilise le curseur 
resBrooklyn.forEach( doc => {
    count = count + 1;
});

print(count);

// Comparaison avec la méthode d'agrégation pour compter
print(resBrooklyn.count())