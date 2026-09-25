export interface Libro{
    key: string,
    title: string,
    authors?:{
        author:{
            key: string
        }
    }[]
    description: unknown,
    subjects?: string[]
}

/*
{
"description": {"type": "/type/text", "value": "*Le Petit Prince* est une \u0153uvre de langue fran\u00e7aise, la plus connue d'Antoine de Saint-Exup\u00e9ry. Publi\u00e9 en 1943 \u00e0 New York simultan\u00e9ment \u00e0 sa traduction anglaise, c'est une \u0153uvre po\u00e9tique et philosophique sous l'apparence d'un conte pour enfants.\r\n\r\nTraduit en quatre cent cinquante-sept langues et dialectes, *Le Petit Prince* est le deuxi\u00e8me ouvrage le plus traduit au monde apr\u00e8s la Bible.\r\n\r\nLe langage, simple et d\u00e9pouill\u00e9, parce qu'il est destin\u00e9 \u00e0 \u00eatre compris par des enfants, est en r\u00e9alit\u00e9 pour le narrateur le v\u00e9hicule privil\u00e9gi\u00e9 d'une conception symbolique de la vie. Chaque chapitre relate une rencontre du petit prince qui laisse celui-ci perplexe, par rapport aux comportements absurdes des \u00ab grandes personnes \u00bb. Ces diff\u00e9rentes rencontres peuvent \u00eatre lues comme une all\u00e9gorie.\r\n\r\nLes aquarelles font partie du texte et participent \u00e0 cette puret\u00e9 du langage : d\u00e9pouillement et profondeur sont les qualit\u00e9s ma\u00eetresses de l'\u0153uvre.\r\n\r\nOn peut y lire une invitation de l'auteur \u00e0 retrouver l'enfant en soi, car \u00ab toutes les grandes personnes ont d'abord \u00e9t\u00e9 des enfants. (Mais peu d'entre elles s'en souviennent.) \u00bb. L'ouvrage est d\u00e9di\u00e9 \u00e0 L\u00e9on Werth, mais \u00ab quand il \u00e9tait petit gar\u00e7on \u00bb.\r\n\r\n(Wikipedia)"}

,"title": "Le petit prince"

,"key": "/works/OL10263W"

,"authors": [{"author": {"key": "/authors/OL31901A"},

, "subjects": ["adventure", "fantasy", "friendship", "love", "childhood", "loss", "loneliness", "Children's fiction", "Friendship, fiction", "Fantasy fiction", "Princes, fiction", "Fairy tales", "Adventure and adventurers, fiction", "Princes", "Fiction", "Toy and movable books", "Continental european fiction (fictional works by one author)", "French language, readers", "Romans, nouvelles", "Travel, fiction", "Juvenile fiction", "Children's stories, French", "Pride and vanity", "Asteroids", "Conduct of life", "Fantasmes", "Romans, nouvelles, etc. pour la jeunesse", "Pr\u00edncipes", "Novela juvenil", "Fiction, general", "Philosophy", "Princes -- Juvenile fiction", "Air pilots -- Juvenile fiction", "Friendship -- Juvenile fiction", "Princes -- Romans, nouvelles, etc. pour la jeunesse", "Pilotes d'ae\u0301ronef -- Romans, nouvelles, etc. pour la jeunesse", "Pilotos ae\u0301reos -- Novela juvenil", "Pri\u0301ncipes -- Novela juvenil", "Cuentos de hadas", "Air pilots", "Novela fanta\u0301stica", "Deaf children", "Juvenile", "Legends", "Foxes", "Deserts", "Children's literature, french", "Translations into english", "Short novel", "Allegories", "Extraterrestrial beings", "Juvenile films", "Drama", "Planets", "Fantastic fiction", "General", "Fiction - general", "New york times bestseller", "French Fantasy fiction", "French language", "Translations into Russian", "Translations into Yiddish", "Translations into German", "Translations into Turkish", "Children's stories, Turkish", "Pop-up books", "French fiction"]

*/
