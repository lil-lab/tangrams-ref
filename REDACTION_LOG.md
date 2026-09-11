# Redaction change log

Generated from `redact.py` + `rules.py`. Covers every change made to the free-text
fields of the Dryad archive. Source files are unchanged; the redacted copies carry
the `_redacted` suffix in this repo and the original filenames inside the zip.

## Scope

Only the points raised in review were acted on. Nothing else was altered: no rows were
dropped, no numeric column was overwritten, and every turn that helps identify the
target shape was kept — including clarification questions, the bare answers to them
(`yes`, `no`, `correct`), and corrections.

Three operations were used.

- **Drop** — the whole utterance is removed. Applied to crude or sexual content, and to
  utterances that are entirely conversational (greetings, pleasantries, task chatter,
  demographic probes, bare requests for a description, contentless filler).
- **Trim** — where a conversational remark is folded into the same utterance as a valid
  shape description, only that clause is cut out. The description around it, punctuation
  included, is left exactly as the participant typed it.
- **Redact** — `[redacted]` stands in for a direct identifier. Used once, for a phase-1
  entry consisting solely of a personal name.

Crude content is dropped rather than masked: a `[redacted]` marker left in the text
would signpost what it replaced. No `[redacted]` marker appears anywhere in the archive
except the single personal name.

## Utterances dropped, trimmed or redacted, by reason

Counted over the participant-facing tables (`full_data.csv`, `pilot1_data.csv`,
`pilot2_data.csv`); the processed tables in `analyses/data/` inherit the same edits.

| Reason | Utterances affected | Distinct wordings |
|---|---|---|
| contentless filler | 176 | 49 |
| social pleasantry or praise | 117 | 109 |
| greeting or sign-off | 97 | 29 |
| task / platform commentary | 83 | 77 |
| request for a description | 64 | 45 |
| crude / sexual content | 23 | 21 |
| demographic probe or self-disclosure | 7 | 7 |
| direct identifier (personal name) | 1 | 1 |
| **total** | **568** | **338** |

## Cells changed, by file

| File | Column | Cells changed |
|---|---|---|
| `analyses/data/clean_no_discourse.csv` | `listener_desc` | 15 |
| `analyses/data/clean_no_discourse.csv` | `speaker_desc` | 106 |
| `analyses/data/pilot1_data.csv` | `description` | 27 |
| `analyses/data/pilot2_data.csv` | `description` | 34 |
| `analyses/data/pre_post.csv` | `p1_description` | 36 |
| `analyses/data/pre_post.csv` | `p2_description` | 39 |
| `analyses/data/shepard_pairs.csv` | `phase2_text` | 64 |
| `analyses/data/shepard_pairs.csv` | `phase3_text` | 10 |
| `analyses/data/shepard_pairs_pixsim.csv` | `phase2_text` | 64 |
| `analyses/data/shepard_pairs_pixsim.csv` | `phase3_text` | 10 |
| `analyses/data/voting_text_embed_similarity.csv` | `ori_post` | 57 |
| `analyses/data/voting_text_embed_similarity.csv` | `ori_pre` | 32 |
| `data/full_data.csv` | `description` | 502 |

## Utterances removed in full

### contentless filler

`?` ×41, `.` ×34, `:)` ×5, `...` ×4, `lol` ×4, `??` ×3, `gg` ×3, `haha` ×3, `/` ×2, `cool` ×2, `go` ×2, `uhhhh` ×2, `>:)`, `GG`, `ggs`, `go go go`, `hahaha`, `hm`, `hmmmm`, `huh`, `hurry`, `l`, `oh boy`, `OKKK`, `one`, `quick`, `QUICK`, `ugh`

### social pleasantry or praise

`sorry` ×4, `my bad` ×3, `all good`, `almost lost it there XD`, `bit hard to describe right off the bat`, `Booyah!`, `Congrats! I'm sure we'll get these all right now lol`, `for the record i enjoy playing with you`, `getting easier now`, `good description`, `haha ok`, `haha too easy`, `haha yes, fox wouldve been a better way to see that`, `haha, dont worry`, `hahah that made me laugh`, `hahaha we're getting all the bonuses`, `hahahaha struggling to be creative with the descriptions here xD`, `hard to describe`, `hard to desrcribe`, `I guess it makes it easier when it's repetitive`, `I like when they repeat them haha`, `I love how we have names for each object now lmao`, `I see what you mean now haha`, `I was wondering the same thing`, `i've been waiting ages for that one to come up :D`, `its okay`, `just guess haha`, `Just wanted to say good job`, `lol sorry`, `nice on that last one`, `nice work`, `Nice!`, `nicee`, `no prob!`, `no problem this is crazy`, `no worries`, `No worries i struggled with the explanation`, `No worries!`, `not sure i believe you haha...`, `np`, `Oh then I guess we lose. :P`, `Okay this is actually a lot easier than I thought it would be ahaha`, `Only missed one so far, doing well!!!`, `panicked a bit there D:`, `perfect score!`, `same to you`, `so are you`, `Sorry`, `sorry about that`, `Sorry about that`, `sorry i got the last one wrong, my bad`, `sorry last time!`, `sorry thats not a great description`, `sorry v hard to describe this one`, `sorry!`, `sorry! really difficult`, `Sorry, I am here now`, `Struggling a little!`, `Thanks`, `thanks`, `Thanks i got it`, `these are difficult`, `this is entertaining`, `this is fun!`, `this one is tough to describe`, `this ones hard idk`, `this was fun`, `too easy`, `ur awesome`, `Very nie.`, `we are doing well!`, `We are! :)`, `we did pretty good`, `we got thisss`, `we're doing well fairplay`, `we're on a roll`, `well done on the last  one`, `wooo!!!`, `yes it is!`, `You must describe better than I do ha ha!`

### greeting or sign-off

`Hi` ×20, `hello` ×13, `hi` ×11, `Hello` ×8, `hey` ×5, `hello?` ×4, `Hello?` ×2, `How do you do?` ×2, `good u?`, `hello :)`, `hello is anyone there?`, `hello.....`, `Hey there!`, `hey!`, `Hi send me the description when you are ready.`, `hi there. what does the first one look like?`, `Hi you still there`, `Nice to meet you`, `thanks, been a pleasure`, `tres bien`, `Well done, have a good rest of the day!`

### task / platform commentary

`i hear` ×3, `reset` ×3, `ready` ×2, `Reset` ×2, `50/50`, `Alright so this is the one I thought it was`, `are you ok`, `are you still there ?`, `are you there`, `Are you there?`, `are you there?`, `As long as chat works`, `be cool if we got a speed bonus as well`, `either tech issues or.....`, `gone to sleep ?`, `have you left the building ?`, `Hello, I think the chat is delayed`, `here now, page wouldn't load`, `human`, `i am ready`, `i cant hear you`, `i didn't realize it would change that fast.`, `I hear now`, `i'll have a cup of tea if you're making one`, `i'm hee`, `i'm here`, `if we need more time, just talk`, `im ready`, `im ready :)`, `it seems to keep refreshing`, `it's running very slow on my system`, `Its you go describe`, `ive got you`, `lets do this!`, `Lets do this!`, `mine too`, `nearly finished... have i been interacting with a human or a robot?`, `oh shoot didnt realize i was speaker`, `okay there's only like two we haven't done`, `Oooooh my turn :P`, `or do we have tech issues ?`, `part of the game ?`, `pick anything just for fun`, `ready for direction`, `so slow`, `sorry about the last one they moved the square`, `sorry they said cant repeat`, `Still waiting`, `Take your time i can reset the timer by typing a message`, `the game is slow`, `the rules said like no connection to before so please leave out AGAIN`, `There are two that fit the description`, `think they messed with us last round....`, `time running down`, `timer`, `We are getting paid for this - dont u love Prolific!!!`, `worth a shot`, `you called it`, `you have to type`, `You there?`, `you there?`, `your turn`

### request for a description

`describe please` ×4, `anything` ×3, `more` ×3, `more info` ×3, `what does it look like` ×3, `what does it look like?` ×3, `whats it look like?` ×3, `anything?` ×2, `need more` ×2, `what do you see` ×2, `which one` ×2, `Any descriptions for me please?`, `any ideas`, `any ideas??`, `anymore?`, `Are you going to describe it lol?`, `can you describe it a bit more?`, `Can you describe more?`, `Can you see it?`, `describe the shapes from top to bottom`, `explain more please`, `help`, `I dont see anything`, `more info please`, `more info pls`, `more please?`, `need more description`, `please describe the chosen image`, `rediscribe thanks`, `stuck?`, `tell me somthing bro`, `The Shape?`, `what do you think it most looks like`, `what does it look lik`, `What does it look like`, `what does it look like this time?`, `what does it look likke`, `what does it look lkike`, `what does the image look like?`, `What image am I looking for?`, `what is your description?`, `What now?`, `what's it look like?`, `whatg does it look like`, `whats the description?`

### crude / sexual content

23 utterances, 21 distinct, each removed in
full. The wordings are not reproduced here; see `redaction_changelog.tsv` for the
audit trail.

### demographic probe or self-disclosure

`[self-disclosed age redacted]`, `age?`, `don't want to say age!`, `f`, `im m`, `ru m or f?`, `where ru from?`

### direct identifier (personal name)

One phase-1 entry consisting solely of a personal name, so the whole entry is
`[redacted]`.

## Conversational remarks trimmed out of a valid description

The shape description was kept in each of these; only the quoted remark was removed.

### contentless filler

`:)` ×16, `lol` ×12, `haha` ×4, `oh` ×3, `:-)`, `:_`, `:D`, `:O`, `;)`, `ahahah`, `ahh`, `GG :`, `hahahaha`, `heh`, `hmm`, `hmmm`, `Lmao`, `Oh`, `OH`, `oh god`, `oh!`, `uh`, `umm`, `WOW`

### social pleasantry or praise

`ah sorry`, `also good job partner`, `and good job!`, `and sorry i mixed them up`, `anyway`, `at least this is pretty easy :'`, `been dreading this one`, `Difficult! ... sorry!`, `good description on that last one btw!!`, `good description!!`, `Great description btw`, `great description last time!!`, `Great job`, `i know! this is hard!`, `I've enjoyed you as my partner!`, `llama was a good description ahahha`, `lol. thank you`, `partner!`, `Sorry`, `sorry`, `sorry wouldn't let me type`, `Sorry!`, `sorry!`, `Sorry! But..`, `the random one i struggle to describe!`, `This is hard`, `this is hard to explain`, `this is hard!`, `Very hard to describe`, `yeah me too!!!`, `you descriptions are much better than mine haha`, `you should be a writer`

### greeting or sign-off

`Hi` ×6, `Hello` ×4, `also hi!`, `been great playing this with u!!`, `great to have met you`, `Have a nice day`, `Hello by the way :`, `hi`, `nice to meet you`, `Nice work and take care`, `thanks for the game`

### task / platform commentary

`Also our images are laid out differently so dont rely on that`, `Are you a bot??`, `are you really playing now ?`, `are you seeing these messages??`, `Can you type quicker at your end?`, `have you been getting my messgaes?`, `Hoping they'll change these images up before the end`, `i think the messages are only sent if you describe the shape, not the position its in.`, `I timed out on the last one so dunno if i got it`, `Image is kinda cut off for me`, `oh I was the speaker sorry`, `Please message me when you are the speaker`, `Why aren't you sending me messages when I'm the listener?`, `why aren't you typing when it's your turn?`, `why did we get timed out on the last one?`

## Kept, deliberately

- Bare answers and confirmations (`yes`, `no`, `yeah`, `ok`, `correct`, `got it`,
  `wait`): they answer a question about the shape, so they are part of the referring
  exchange rather than small talk.
- Clarification questions that mention the shape (`Square head?`, `is it slanted`).
- References back to earlier referents and labels (`the one you said before was like a
  tongue sticking out`, `the one i got wrong`) — these are the convention data the
  study measures.
- Non-sexual anatomical and garment comparisons used descriptively (`butt`, `bra`).
- Emoticons and interjections that sit inside a description rather than at its edge.
- Comparisons of a shape to a symbol (e.g. a swastika). Dryad's human-subjects
  guidance covers identifiability only; these disclose nothing about a participant.
