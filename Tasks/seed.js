const connection = require("../config/mongoConnection");
const initialSeed = require("../data/initialSeed");
const userSeed = require("../data/user");
const wordSeed = require("../data/words");

// const Ascetic = initialSeed.create(
//   "Ascetic",
//   "Practicing strict self-denial as a measure of personal and especially spiritual discipline",
//   ["Austere", "Disciplined"],
//   ["Sybaritic"],
//   [
//     "In that distorted state, it felt good to deprive myself, as if it were some ascetic form of self-mastery.",
//     "His cowl was thrown back, revealing his pale, ascetic countenance and shaven head.",
//   ]
// );

// const Anachronistic = initialSeed.create(
//   "Anachronistic",
//   "Pertaining to or containing an anachronism.",
//   ["Antique", "Archaic"],
//   ["Current", "Modern"],
//   [
//     "The boys’ music lessons, to Peter, seemed woefully, almost willfully anachronistic, a literal fiddling while Rome or Los Angeles burned.",
//     "She has neglected no source which would throw light upon this very anachronistic epoch.",
//   ]
// );

// const Aggrandize = initialSeed.create(
//   "Aggrandize",
//   "To widen in scope; increase in size or intensity; enlarge; extend.",
//   ["Acclaim", "Applaud"],
//   ["Reduce", "Diminish"],
//   [
//     "They only cared to aggrandize themselves, without thought of national feeling or geographical conditions.",
//     "His ambition was not to secure for himself ease or luxury, but to extend his imperial power, and to aggrandize his family.",
//   ]
// );

// const Alacrity = initialSeed.create(
//   "Alacrity",
//   "Cheerful readiness, promptness, or willingness",
//   ["Alertness", "Dispatch"],
//   ["Apathy", "Sluggishness"],
//   [
//     "Bernard, professing great alacrity, looked about him; but he still lingered near his companions.",

//     "Victor Lebrun, who happened to be in the city, bent upon relaxation, had accepted with alacrity.",
//   ]
// );

// const Abnegation = initialSeed.create(
//   "Abnegation",
//   "The act of relinquishing or giving up a right, possession, etc.",
//   ["Abandonment", "Refusal"],
//   ["Acceptance", "Adoption"],
//   [
//     "His devotion to you is the most beautiful expression of self-abnegation that I have ever met.",
//     "It is difficult to decide what is meant by sacrifice and self-abnegation in this world of human subterfuge and self-deception.",
//   ]
// );

// const Awed = initialSeed.create(
//   "Awed",
//   "Filled with or expressing awe.",
//   ["Alarm", "Flabbergast"],
//   ["Assured", "Cheered"],
//   [
//     "We continue to be awed & humbled by the blessings of parenting.",
//     "Her tragic attitude, her wondrous beauty, awed the men, and they lowered the guns that had been raised to slay the father.",
//   ]
// );

// const Beguile = initialSeed.create(
//   "Beguile",
//   "To influence by trickery, flattery, etc.; mislead; delude.",
//   ["Deceive", "Entice"],
//   ["Revolt", "Repel"],
//   [
//     "At night, I sat a long time on the deck, listening to the sea songs with which the crew beguile the evening watch.",
//     "No party had been alluring enough to beguile her from her books.",
//   ]
// );

// const Brusque = initialSeed.create(
//   "Brusque",
//   "Being or characterized by direct, brief, and potentially rude speech or manner",
//   ["Blunt", "Gruff"],
//   ["Circuitous", "Mealymouthed"],
//   [
//     "Sifton writes in the brusque but encouraging tone of a neighborhood dad coaching a soccer game.",
//     "She assumed, however, a tone almost brusque, artificially airy and unimportant.",
//   ]
// );

// const Blandishment = initialSeed.create(
//   "Blandishment",
//   "A nice thing that someone says or does to persuade another to do something",
//   ["Allurement", "Adulation"],
//   ["Belittlement", "Depreciation"],
//   [
//     "These men, who had bravely faced persecution, were at last overcome by blandishment.",
//     "In vain did the Professor try argument and blandishment to remove his scruples of conscience.",
//   ]
// );

// const Callous = initialSeed.create(
//   "Callous",
//   "Having or showing a lack of sympathy or tender feelings",
//   ["Apathetic", "Careless"],
//   ["Charitable", "Compassionate"],
//   [
//     "These men, who had bravely faced persecution, were at last overcome by blandishment.",
//     "In vain did the Professor try argument and blandishment to remove his scruples of conscience.",
//   ]
// );

// const Camaraderie = initialSeed.create(
//   "Camaraderie",
//   "The feeling of closeness and friendship that exists between companions",
//   ["Community", "Society"],
//   ["Loneliness", "Lonesomeness"],
//   [
//     "The resulting camaraderie among players did help bridge those communities — but only to a point.",
//     "Nearly four months on, people—including the top management—are missing the camaraderie.",
//   ]
// );

// const Cajole = initialSeed.create(
//   "Cajole",
//   "To get someone to do something by gentle urging, special attention, or flattery",
//   ["Blandish", "Coax"],
//   ["Oblige", "Require"],
//   [
//     "Changing his tactics he tried to cajole him and offered him money, but with similar want of success.",
//     "Ever there were his insidious wiles to compromise, cajole, trick and betray them.",
//   ]
// );

// const Clamor = initialSeed.create(
//   "Clamor",
//   "A violent shouting",
//   ["Howl", "Outcry"],
//   ["Quiet", "Silence"],
//   [
//     "There is less of a clamor to dominate the discussion, and the Zoom chat is always full of questions.",
//     "No one could deny that Government had yielded in the face of noisy clamor and forcible resistance.",
//   ]
// );

// const Circumlocution = initialSeed.create(
//   "Circumlocution",
//   "Deliberate evasion in speech",
//   ["Euphemism", "Diffuseness"],
//   ["Directness", "Frankness"],
//   [
//     "He always disdained circumlocution, prided himself upon the directness and simplicity of his address.",
//     "One gathers, indeed, that the art of running a Circumlocution Office is carried to a high pitch in the political sphere.",
//   ]
// );

// const Cognizant = initialSeed.create(
//   "Cognizant",
//   "Having specified facts or feelings actively impressed on the mind",
//   ["Alive", "Conscious"],
//   ["Insensible", "Oblivious"],
//   [
//     "You have to be cognizant that not everyone has the awareness that we do.",
//     "Napoleon, himself a sceptic, was cognizant of this slave philosophy.",
//   ]
// );

// const Construe = initialSeed.create(
//   "Construe",
//   "To make plain or understandable",
//   ["Clarify", "Illuminate"],
//   ["Obscure", "Confuse"],
//   [
//     "Read over the Ovid to Jefferson, and construe about ten lines more.",
//     "She was an imposing looking spinster, with a curious expression on her features which was difficult to construe.",
//   ]
// );

// const Convivial = initialSeed.create(
//   "Convivial",
//   "Likely to seek or enjoy the company of others",
//   ["Companionable", "Sociable"],
//   ["Antisocial", "Insociable"],
//   [
//     "Night after night he was absent until the latest hours at convivial clubs and card-parties.",
//     "A convivial club, meeting once a week, established by Gibbon and other travellers.",
//   ]
// );

// const Denigrate = initialSeed.create(
//   "Denigrate",
//   "To express scornfully one's low opinion of",
//   ["Belittle", "Diminish"],
//   ["Acclaim", "Applaud"],
//   [
//     "So instead of feeling denigrated or ostracized, they feel seen and valued as part of the academic community.",
//   ]
// );

// const Dispel = initialSeed.create(
//   "Dispel",
//   "to cause (members of a group) to move widely apart",
//   ["Disband", "Disperse"],
//   ["Assemble", "Cluster"],
//   [
//     "My thinking was that if I had a YC stamp of approval, that could dispel some of the skepticism around my product.",
//     "It’s time to dispel the belief that the end of cookies means the end of personalized recommendations.",
//   ]
// );
