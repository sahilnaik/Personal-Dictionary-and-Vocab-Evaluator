const mongoCollections = require('../config/mongoCollections');
const flashcard = mongoCollections.flashcard;




module.exports={



    async getflashcardbyid(id)
{

    const cards=await flashcard();
const card=await cards.findOne({_id:id});
return card;

},

    async create_word(flashcardId,id,word,meaning,synonym,antonym,example,correctOrNot)
    {
    
    

    let { ObjectId } = require('mongodb');
        let parsedId = ObjectId(flashcardId);

        let object=await this.getflashcardbyid(parsedId);
        const cardcollection=await flashcard();

        
                let obj=await cardcollection.updateOne({_id:parsedId,"sessions._id": id},{ $push:{ "sessions.$.words":
                {
                    word:word,
                    meaning:meaning,
                    synonym:synonym,
                    antonym:antonym,
                    example:example,
                    correctOrNot:correctOrNot
            
                }}})
            }
    
    
    
    
    
    };