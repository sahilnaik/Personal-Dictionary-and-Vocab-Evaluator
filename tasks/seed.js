const { users } = require("../data/index")
const { addWordSeed, updateCounters } = require("../data/words")
const { createSeedSession } = require("../data/flashcard")
const { createSeedMCQ } = require("../data/mcq")

const createSeedUser = async () => {  
  try {
    let newUser = await users.create(
      "John",
      "Doe",
      "johndoe@gmail.com",
      "123-456-7890",
      "qwertyuiop"
    ) 
    
    console.log("Email Address: johndoe@gmail.com")
    console.log("Password: qwertyuiop")

    return newUser
  } catch (e) {
    console.log(e)
  }
}

const addWordSeeds = async (seedUser) =>{
  try {
    
  const Ascetic = await addWordSeed(
    seedUser,
    "Ascetic",
    "Practicing strict self-denial as a measure of personal and especially spiritual discipline",
    ["Austere", "Disciplined"],
    ["Sybaritic"],
    [
      "In that distorted state, it felt good to deprive myself, as if it were some ascetic form of self-mastery.",
      "His cowl was thrown back, revealing his pale, ascetic countenance and shaven head.",
    ],
    "learning",
    0
  );

  const Anachronistic = await addWordSeed(
    seedUser,
    "Anachronistic",
    "Pertaining to or containing an anachronism.",
    ["Antique", "Archaic"],
    ["Current", "Modern"],
    [
      "The boys’ music lessons, to Peter, seemed woefully, almost willfully anachronistic, a literal fiddling while Rome or Los Angeles burned.",
      "She has neglected no source which would throw light upon this very anachronistic epoch.",
    ],
    "learning",
    1
  );

  const Aggrandize = await addWordSeed(
    seedUser,
    "Aggrandize",
    "To widen in scope; increase in size or intensity; enlarge; extend.",
    ["Acclaim", "Applaud"],
    ["Reduce", "Diminish"],
    [
      "They only cared to aggrandize themselves, without thought of national feeling or geographical conditions.",
      "His ambition was not to secure for himself ease or luxury, but to extend his imperial power, and to aggrandize his family.",
    ],
    "learning",
    1
  );

  const Alacrity = await addWordSeed(
    seedUser,
    "Alacrity",
    "Cheerful readiness, promptness, or willingness",
    ["Alertness", "Dispatch"],
    ["Apathy", "Sluggishness"],
    [
      "Bernard, professing great alacrity, looked about him; but he still lingered near his companions.",

      "Victor Lebrun, who happened to be in the city, bent upon relaxation, had accepted with alacrity.",
    ],
    "yet to learn",
    0
  );

  const Abnegation = await addWordSeed(
    seedUser,
    "Abnegation",
    "The act of relinquishing or giving up a right, possession, etc.",
    ["Abandonment", "Refusal"],
    ["Acceptance", "Adoption"],
    [
      "His devotion to you is the most beautiful expression of self-abnegation that I have ever met.",
      "It is difficult to decide what is meant by sacrifice and self-abnegation in this world of human subterfuge and self-deception.",
    ],
    "learning",
    1
  );

  const Awed = await addWordSeed(
    seedUser,
    "Awed",
    "Filled with or expressing awe.",
    ["Alarm", "Flabbergast"],
    ["Assured", "Cheered"],
    [
      "We continue to be awed & humbled by the blessings of parenting.",
      "Her tragic attitude, her wondrous beauty, awed the men, and they lowered the guns that had been raised to slay the father.",
    ],
    "learning",
    2
  );

  const Beguile = await addWordSeed(
    seedUser,
    "Beguile",
    "To influence by trickery, flattery, etc.; mislead; delude.",
    ["Deceive", "Entice"],
    ["Revolt", "Repel"],
    [
      "At night, I sat a long time on the deck, listening to the sea songs with which the crew beguile the evening watch.",
      "No party had been alluring enough to beguile her from her books.",
    ],
    "learning",
    1
  );

  const Brusque = await addWordSeed(
    seedUser,
    "Brusque",
    "Being or characterized by direct, brief, and potentially rude speech or manner",
    ["Blunt", "Gruff"],
    ["Circuitous", "Mealymouthed"],
    [
      "Sifton writes in the brusque but encouraging tone of a neighborhood dad coaching a soccer game.",
      "She assumed, however, a tone almost brusque, artificially airy and unimportant.",
    ],
    "yet to learn",
    0
  );

  const Blandishment = await addWordSeed(
    seedUser,
    "Blandishment",
    "A nice thing that someone says or does to persuade another to do something",
    ["Allurement", "Adulation"],
    ["Belittlement", "Depreciation"],
    [
      "These men, who had bravely faced persecution, were at last overcome by blandishment.",
      "In vain did the Professor try argument and blandishment to remove his scruples of conscience.",
    ],
    "learnt",
    5
  );

  const Callous = await addWordSeed(
    seedUser,
    "Callous",
    "Having or showing a lack of sympathy or tender feelings",
    ["Apathetic", "Careless"],
    ["Charitable", "Compassionate"],
    [
      "These men, who had bravely faced persecution, were at last overcome by blandishment.",
      "In vain did the Professor try argument and blandishment to remove his scruples of conscience.",
    ],
    "yet to learn",
    0
  );

  const Camaraderie = await addWordSeed(
    seedUser,
    "Camaraderie",
    "The feeling of closeness and friendship that exists between companions",
    ["Community", "Society"],
    ["Loneliness", "Lonesomeness"],
    [
      "The resulting camaraderie among players did help bridge those communities — but only to a point.",
      "Nearly four months on, people—including the top management—are missing the camaraderie.",
    ],
    "learning",
    1
  );

  const Cajole = await addWordSeed(
    seedUser,
    "Cajole",
    "To get someone to do something by gentle urging, special attention, or flattery",
    ["Blandish", "Coax"],
    ["Oblige", "Require"],
    [
      "Changing his tactics he tried to cajole him and offered him money, but with similar want of success.",
      "Ever there were his insidious wiles to compromise, cajole, trick and betray them.",
    ],
    "learning",
    0
  );

  const Clamor = await addWordSeed(
    seedUser,
    "Clamor",
    "A violent shouting",
    ["Howl", "Outcry"],
    ["Quiet", "Silence"],
    [
      "There is less of a clamor to dominate the discussion, and the Zoom chat is always full of questions.",
      "No one could deny that Government had yielded in the face of noisy clamor and forcible resistance.",
    ],
    "learning",
    2
  );

  const Circumlocution = await addWordSeed(
    seedUser,
    "Circumlocution",
    "Deliberate evasion in speech",
    ["Euphemism", "Diffuseness"],
    ["Directness", "Frankness"],
    [
      "He always disdained circumlocution, prided himself upon the directness and simplicity of his address.",
      "One gathers, indeed, that the art of running a Circumlocution Office is carried to a high pitch in the political sphere.",
    ],
    "learning",
    1
  );

  const Cognizant = await addWordSeed(
    seedUser,
    "Cognizant",
    "Having specified facts or feelings actively impressed on the mind",
    ["Alive", "Conscious"],
    ["Insensible", "Oblivious"],
    [
      "You have to be cognizant that not everyone has the awareness that we do.",
      "Napoleon, himself a sceptic, was cognizant of this slave philosophy.",
    ],
    "learning",
    1
  );

  const Construe = await addWordSeed(
    seedUser,
    "Construe",
    "To make plain or understandable",
    ["Clarify", "Illuminate"],
    ["Obscure", "Confuse"],
    [
      "Read over the Ovid to Jefferson, and construe about ten lines more.",
      "She was an imposing looking spinster, with a curious expression on her features which was difficult to construe.",
    ],
    "learning",
    1
  );

  const Convivial = await addWordSeed(
    seedUser,
    "Convivial",
    "Likely to seek or enjoy the company of others",
    ["Companionable", "Sociable"],
    ["Antisocial", "Insociable"],
    [
      "Night after night he was absent until the latest hours at convivial clubs and card-parties.",
      "A convivial club, meeting once a week, established by Gibbon and other travellers.",
    ],
    "yet to learn",
    0
  );

  const Denigrate = await addWordSeed(
    seedUser,
    "Denigrate",
    "To express scornfully one's low opinion of",
    ["Belittle", "Diminish"],
    ["Acclaim", "Applaud"],
    [
      "So instead of feeling denigrated or ostracized, they feel seen and valued as part of the academic community.",
    ],
    "learnt",
    3
  );

  const Dispel = await addWordSeed(
    seedUser,
    "Dispel",
    "to cause (members of a group) to move widely apart",
    ["Disband", "Disperse"],
    ["Assemble", "Cluster"],
    [
      "My thinking was that if I had a YC stamp of approval, that could dispel some of the skepticism around my product.",
      "It’s time to dispel the belief that the end of cookies means the end of personalized recommendations.",
    ],
    "learning",
    2
  );

  const Depleted = await addWordSeed(
    seedUser,
      "Depleted",
      "To be exhausted or exhausted of",
      ["Exhausted", "Exhausted"],
      ["Full", "Filled"],
      [
          "The air was full of the smell of the sea, and the sea was full of the smell of the air.",
          "The sea was full of the smell of the air, and the air was full of the smell of the sea.",
      ],
      "learning",
      1   
  );
  const Minutely = await addWordSeed(
    seedUser,
      "Minutely",
      "To be done or done at a very small amount of time",
      ["Sporadic", "Occasional"],
      ["Frequent", "Regular"],
      [
          "The minutely appearance of the sun was a sign of the sun’s energy."
      ],
      "learning",
      1  
  );
  const Disseminate = await addWordSeed(
    seedUser,
      "Disseminate",
      "To spread widely",
      ["Disperse", "Disperse"],
      ["Assemble", "Cluster"],
      [
          "But there is no sign of Papin working on an atmospheric steam engine after 1704, or of news of the version of his engine recorded by North being disseminated."
      ],
      "learning",
      1
  );
  const Seductive = await addWordSeed(
    seedUser,
      "Seductive",
      "To attract or draw the attention of",
      ["Attract", "Attract"],
      ["Repel", "Repel"],
      [
          "The seductive appeal of the sea was a sign of the sea’s energy."
      ],
      "learning",
      1
  );
  const Consumerism = await addWordSeed(
    seedUser,
      "Consumerism",
      "The practice of buying and selling goods and services",
      ["Bargaining", "Bargaining"],
      ["Selling", "Buying"],
      [
          "Consumerism is a form of economic activity in which the purchaser is the consumer and the seller is the producer."
      ],
      "learning",
      1
  );
  const Disparate = await addWordSeed(
    seedUser,
      "Disparate",
      "To be different from",
      ["Different", "Different"],
      ["Similar", "Similar"],
      [
          "The disparity between the two countries was a sign of the countries’ energy."
      ],
      "yet to learn",
      0
  );

  const Strand = await addWordSeed(
    seedUser,
      "Strand",
      "A long, thin, narrow strip of material",
      ["Strip", "Strip"],
      ["Band", "Band"],
      [
          "The strand of the sea was a sign of the sea’s energy."
      ],
      "yet to learn",
      0
  );
  const Maculate = await addWordSeed(
    seedUser,
      "Maculate",
      "To be covered with a fine layer of fine hairs",
      ["Coarse", "Coarse"],
      ["Fine", "Fine"],
      [
          "The maculate appearance of the sea was a sign of the sea’s energy."
      ],
      "yet to learn",
      0
  );
  const Revised = await addWordSeed(
    seedUser,
      "Revised",
      "To be changed or modified",
      ["Change", "Change"],
      ["Unchanged", "Unchanged"],
      [
          "The revised version of the treaty was a sign of the treaty’s energy."
      ],
      "learning",
      1
  );
  const Aqueous = await addWordSeed(
    seedUser,
      "Aqueous",
      "To be watery",
      ["Watery", "Watery"],
      ["Amorphous", "Amorphous"],
      [
          "The aqueous appearance of the sea was a sign of the sea’s energy."
      ],
      "learning",
      0
  );
  const Satiate = await addWordSeed(
    seedUser,
      "Satiate",
      "To satisfy completely",
      ["Satisfy", "Satisfy"],
      ["Insatisfy", "Insatisfy"],
      [
          "The satiate appetite of the sea was a sign of the sea’s energy."
      ],
      "yet to learn",
      0
  );

  const Consign = await addWordSeed(
    seedUser,
      "Consign",
      "To sell or sell at a price",
      ["Sell", "Sell"],
      ["Buy", "Buy"],
      [
          "The consign of the sea was a sign of the sea’s energy."
      ],
      "learning",
      2
  );

  const Tincture = await addWordSeed(
    seedUser,
      "Tincture",
      "To color",
      ["Color", "Color"],
      ["Uncolor", "Uncolor"],
      [
          "The tincture of the sea was a sign of the sea’s energy."
      ],
      "learnt",
      8
  );
  const Petrifaction = await addWordSeed(
    seedUser,
      "Petrifaction",
      "To cause to become brittle",
      ["Bristle", "Bristle"],
      ["Unbristle", "Unbristle"],
      [
          "He observed also other striking similarities between petrifactions and living organisms."
      ],
      "learning",
      1
  );

  const Doggedness = await addWordSeed(
    seedUser,
      "Doggedness",
      "To be stubborn",
      ["Stubborn", "Stubborn"],
      ["Unstubborn", "Unstubborn"],
      [
          "We lost the flare of excitement and we had not yet put on the doggedness of a long war."
      ],
      "learning",
      1
  );
  const Suede = await addWordSeed(
    seedUser,
      "Suede",
      "To be made of leather",
      ["Leather", "Leather"],
      ["No leather", "No leather"],
      [
          "You want to tell her about this morning at the copy shop: the man in the suede shirt walking away, checking his phone."
      ],
      "yet to learn",
      0
  );
  const Dullard = await addWordSeed(
    seedUser,
    "Dullard",
    "A person who is not very bright",
    ["Bore"],
    ["Interesting"],
    [
      "Rekh would think him a dullard, unfit to learn the goldsmith’s trade."
    ],
    "learning",
    2 
  );
  const Damp = await addWordSeed(
    seedUser,
    "Damp",
    "To be wet",
    ["Wet"],
    ["Dry"],
    [
      "The damp air was a sign of the air’s energy."
    ],
    "learning",
    0
  );
  const Pungent = await addWordSeed(
    seedUser,
    "Pungent",
    "To be bitter",
    ["Bitter"],
    ["Sour"],
    [
      "The pungent smell of the sea was a sign of the sea’s energy."
    ],
    "learnt",
    5
  );
  const Pithy = await addWordSeed(
    seedUser,
    "Pithy",
    "To be short and to the point",
    ["Short", "Short"],
    ["Long", "Long"],
    [
      "The pithy description of the sea was a sign of the sea’s energy."
    ],
    "learning",
    2
  );
  const Horizontal = await addWordSeed(
    seedUser,
    "Horizontal",
    "To be straight",
    ["Straight"],
    ["Curved"],
    [
      "He was wearing long Quidditch robes in thick horizontal stripes of bright yellow and black."
    ],
    "yet to learn",
    0
  );
  const Unnatural = await addWordSeed(
    seedUser,
    "Unnatural",
    "To be unnatural",
    ["Abnormal"],
    ["Natural"],
    [
      "Suddenly Philip Lombard laughed—a high unnatural laugh."
    ],
    "learning",
    1
  );
  const Unwieldy = await addWordSeed(
    seedUser,
    "Unwieldy",
    "To be heavy",
    ["Heavy"],
    ["Light"],
    [
      "She continued working until she got too unwieldy to dust under the desks."
    ],
    "yet to learn",
    0
  );

  const Wrought = await addWordSeed(
    seedUser,
    "Wrought",
    "To be made of metal",
    ["Molded"],
    ["Undone"],
    [
      "His mask was wrought in the shape of a basilisk’s head."
    ],
    "learning",
    0
  );
  const Valedictory = await addWordSeed(
    seedUser,
    "Valedictory",
    "To be crowned with a crown",
    ["Exaugral"],
    ["Unexaugral"],
    [
      "In his valedictory speech, Taylor thanked his teachers"
    ],
    "learning",
    1
  );

  const Heuristic = await addWordSeed(
    seedUser,
    "Heuristic",
    "To be based on the idea of the best way to do something",
    ["Guesswork"],
    ["Exact"],
    [
      "Heuristic reasoning is a method of thinking that is based on the idea of the best way to do something."
    ],
    "learning",
    1
  );
  const Trinity = await addWordSeed(
    seedUser,
    "Trinity",
    "A three-fold",
    ["Triple"],
    ["Single"],
    [
      "By far, most of the babies in the nursery had been sired on human girls by the trinity of gods."
    ],
    "yet to learn",
    0
  ); 
  const Igneous = await addWordSeed(
    seedUser,
    "Igneous",
    "Produced by the action of fire or intense heat",
    ["Fiery"],
    ["Cool"],
    [
      "The landscape is carved by igneous intrusions, lava and ash from volcanic eruptions, and tectonic fracturing, uplift and erosion."
    ],
    "yet to learn",
    0
  );
  const Salable = await addWordSeed(
    seedUser,
    "Salable",
    "To be sold",
    ["Sell"],
    ["Buy"],
    [
      "With each success, their economic agenda becomes more radical and less salable."
    ],
    "learnt",
    12
  );
  const Indiscriminate = await addWordSeed(
    seedUser,
    "Indiscriminate",
    "To be without distinction",
    ["Unbiased"],
    ["Biased"],
    [
      "The indiscriminate attitude of the government was a sign of the government’s energy."
    ],
    "learning",
    2
  );
  const Unreliable = await addWordSeed(
    seedUser,
    "Unreliable",
    "Not worthy of trust",
    ["Untrustworthy"],
    ["Trustworthy"],
    [
      "The Romans were badly outnumbered, surrounded by a sea of unreliable allies."
    ],
    "learnt",
    4
  );
  const Delicacy = await addWordSeed(
    seedUser,
    "Delicacy",
    "To be delicate",
    ["Delicate"],
    ["Undelicate"],
    [
      "I saw that his delicacy was avoiding the right word, so I said, “A clerk.”"
    ],
    "yet to learn",
    0
  );

  } catch (e) {
    console.log(e)
  }
}

const addSeedSession = async function addSeedSession(seedUser) {
  try {
    let session = await createSeedSession(
      seedUser,
      {
        "_id" : 1,
        "words" : [ 
            {
                "word" : "damp",
                "meaning" : "To be wet",
                "synonyms" : "Wet",
                "antonyms" : "Dry",
                "example" : "The damp air was a sign of the air’s energy.",
                "userSelection" : true
            }, 
            {
                "word" : "delicacy",
                "meaning" : "To be delicate",
                "synonyms" : "Delicate",
                "antonyms" : "Undelicate",
                "example" : "I saw that his delicacy was avoiding the right word, so I said, “A clerk.”",
                "userSelection" : true,
                "correctOrNot" : ""
            }, 
            {
                "word" : "consumerism",
                "meaning" : "The practice of buying and selling goods and services",
                "synonyms" : "Bargaining,Bargaining",
                "antonyms" : "Selling,Buying",
                "example" : "Consumerism is a form of economic activity in which the purchaser is the consumer and the seller is the producer.",
                "userSelection" : true,
                "correctOrNot" : ""
            }, 
            {
                "word" : "unreliable",
                "meaning" : "Not worthy of trust",
                "synonyms" : "Untrustworthy",
                "antonyms" : "Trustworthy",
                "example" : "The Romans were badly outnumbered, surrounded by a sea of unreliable allies.",
                "userSelection" : true,
                "correctOrNot" : ""
            }, 
            {
                "word" : "blandishment",
                "meaning" : "A nice thing that someone says or does to persuade another to do something",
                "synonyms" : "Allurement,Adulation",
                "antonyms" : "Belittlement,Depreciation",
                "example" : "These men, who had bravely faced persecution, were at last overcome by blandishment.,In vain did the Professor try argument and blandishment to remove his scruples of conscience.",
                "userSelection" : true,
                "correctOrNot" : ""
            }, 
            {
                "word" : "dispel",
                "meaning" : "to cause (members of a group) to move widely apart",
                "synonyms" : "Disband,Disperse",
                "antonyms" : "Assemble,Cluster",
                "example" : "My thinking was that if I had a YC stamp of approval, that could dispel some of the skepticism around my product.,It’s time to dispel the belief that the end of cookies means the end of personalized recommendations.",
                "userSelection" : false,
                "correctOrNot" : ""
            }, 
            {
                "word" : "valedictory",
                "meaning" : "To be crowned with a crown",
                "synonyms" : "Exaugral",
                "antonyms" : "Unexaugral",
                "example" : "In his valedictory speech, Taylor thanked his teachers",
                "userSelection" : false,
                "correctOrNot" : ""
            }, 
            {
                "word" : "convivial",
                "meaning" : "Likely to seek or enjoy the company of others",
                "synonyms" : "Companionable,Sociable",
                "antonyms" : "Antisocial,Insociable",
                "example" : "Night after night he was absent until the latest hours at convivial clubs and card-parties.,A convivial club, meeting once a week, established by Gibbon and other travellers.",
                "userSelection" : true,
                "correctOrNot" : ""
            }, 
            {
                "word" : "strand",
                "meaning" : "A long, thin, narrow strip of material",
                "synonyms" : "Strip,Strip",
                "antonyms" : "Band,Band",
                "example" : "The strand of the sea was a sign of the sea’s energy.",
                "userSelection" : false,
                "correctOrNot" : ""
            }, 
            {
                "word" : "unnatural",
                "meaning" : "To be unnatural",
                "synonyms" : "Abnormal",
                "antonyms" : "Natural",
                "example" : "Suddenly Philip Lombard laughed—a high unnatural laugh.",
                "userSelection" : false,
                "correctOrNot" : ""
            }
        ],
        "correctCount" : 6,
        "correct" : [ 
            "damp", 
            "delicacy", 
            "consumerism", 
            "unreliable", 
            "blandishment", 
            "convivial"
        ],
        "incorrect" : [ 
            "dispel", 
            "valedictory", 
            "strand", 
            "unnatural"
        ],
        "time" : "Sun, 12 Dec 2021 21:24:31 GMT"
    },
    60
    )
  } catch (e) {
    console.log(e);
  }
}

const addMCQSeed = async function addMCQSeed(seedUser) {
  try {
    let session = await createSeedMCQ(
      seedUser,
      {
        "_id" : 1,
        "words" : [ 
            {
                "question_word" : "blandishment",
                "options" : [ 
                    "Apathetic", 
                    "Disband", 
                    "Allurement", 
                    "Untrustworthy"
                ],
                "answer" : "Allurement",
                "userSelection" : "Apathetic",
                "correctOrNot" : false
            }, 
            {
                "question_word" : "tincture",
                "options" : [ 
                    "Coarse", 
                    "Color", 
                    "Bargaining", 
                    "Fiery"
                ],
                "answer" : "Color",
                "userSelection" : "Fiery",
                "correctOrNot" : false
            }, 
            {
                "question_word" : "pungent",
                "options" : [ 
                    "Delicate", 
                    "Bristle", 
                    "Bitter", 
                    "Guesswork"
                ],
                "answer" : "Bitter",
                "userSelection" : "Bristle",
                "correctOrNot" : false
            }, 
            {
                "question_word" : "unreliable",
                "options" : [ 
                    "Untrustworthy", 
                    "Sell", 
                    "Leather", 
                    "Alive"
                ],
                "answer" : "Untrustworthy",
                "userSelection" : "Untrustworthy",
                "correctOrNot" : true
            }, 
            {
                "question_word" : "salable",
                "options" : [ 
                    "Alive", 
                    "Clarify", 
                    "Sell", 
                    "Sporadic"
                ],
                "answer" : "Sell",
                "userSelection" : "Clarify",
                "correctOrNot" : false
            }
        ],
        "correctCount" : 1,
        "time" : "Sun, 12 Dec 2021 22:33:08 GMT"
    },
    20
    )
  } catch (e) {
    console.log(e);
  }
}
const main = async () => {
  let seedUser = await createSeedUser()
  let word1 = await addWordSeeds(seedUser)
  try {
  let countersUpdate = await updateCounters(seedUser) 
  } catch (e) {
    console.log(e);
  }
  let seedSession = await addSeedSession(seedUser)
  let seedMCQSession = await addMCQSeed(seedUser)
}

main()