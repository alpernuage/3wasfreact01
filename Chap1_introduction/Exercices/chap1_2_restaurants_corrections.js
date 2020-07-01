


// ## 1. Exercice compter le nombre de restaurants

const resBrooklyn = db.restaurants.find({ borough: "Brooklyn" }, { "name": 1 });

let count = 0;
// on utilise le curseur 
resBrooklyn.forEach(doc => {
    count = count + 1;
});

print(count);

// Comparaison avec la méthode d'agrégation pour compter
print(resBrooklyn.count())


// ### 2. Exercices sur la notion de filtrage

// 1. Combien y a t il de restaurants qui font de la cuisine italienne et qui ont un score de 10 au moins .
db.restaurants.find({
    "cuisine": "Italian",
    "grades.score": { $in: [10] } // dès qu'il trouve une valeur qui correspond à ce critère => c'est vrai
}
    , { "name": 1, _id: 0, "grades.score": 1, "address.coord": 1 }).sort({
        "name": 1
    })

db.restaurants.find({
    "cuisine": "Italian",
    "grades.score": 10 // dès qu'il trouve une valeur qui correspond à ce critère => c'est vrai
}
    , { "name": 1, _id: 0, "grades.score": 1, "address.coord": 1 }).sort({
        "name": 1
    })

// 1.bis Combien y a t il de restaurants qui font de la cuisine italienne et qui ont un score de 10 ou moins .
// on en trouve 128
db.restaurants.find({
    "cuisine": "Italian",
    "grades.score": { $lte: 10, $not: { $gt: 10 } }
}
    , { "name": 1, _id: 0, "grades.score": 1 }).sort({
        "name": 1
    })

// compter 
db.restaurants.find({
    "cuisine": "Italian",
    "grades.score": { $lte: 10, $not: { $gt: 10 } }
}
    , { "name": 1, _id: 0, "grades.score": 1 }).sort({
        "name": 1
    }).count()


// autre version là on en trouve 129 il compte la valeur score null
db.restaurants.find({
    "cuisine": "Italian",
    "grades.score": { $not: { $gt: 10 } } // 
}
    , { "name": 1, _id: 0, "grades.score": 1 }).sort({
        "name": 1
    })

db.restaurants.find({
    "cuisine": "Italian",
    "grades.score": { $not: { $gt: 10 } }
}
    , { "name": 1, _id: 0, "grades.score": 1, "address.coord": 1 }).sort({ "name": 1 })


// 2.
db.restaurants.find(
    { "grades.grade": "A", "grades.score": { $gte: 20, $not: { $lt: 20 } } },
    { _id: 0, name: 1 }).sort(
    { name: -1 }
)

db.restaurants.find(
    { "grades.grade": "A", "grades.score": { $gte: 10, $not: { $lt: 10 } } },
    { _id: 0, name: 1 }).sort(
    { name: -1 }
)

// 3. Différents quartiers de NY
db.restaurants.distinct("borough")

// 4. Trouvez tous les types de restaurants dans le quartiers du Bronx. 
db.restaurants.distinct("cuisine", {"borough" : "Bronx"})