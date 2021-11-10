const flashcards = require("./data/flashcard");
const connection = require("./config/mongoConnection");
const sessions = require("./data/sessions");
const words=require("./data/words")



const main = async () => {


try{

    /* const flashcard = await flashcards.create() */
/* const session=await sessions.create_session('618bdd8bd143c0d513f6470b',1,["Correct"],["Not correct"]) */
const word=await words.create_word('618bdd8bd143c0d513f6470b',1,"word","meaning",["synonym"],["antonym"],["example"],true)
}

 catch (error) {
      console.log(error);
    }



    const db = await connection();
    await db.serverConfig.close();
};

main().catch((error) => {
console.log(error);
});
