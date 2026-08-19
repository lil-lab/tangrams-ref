# Data and code for: Ad hoc conventions generalize to new referents

[Access this dataset on Dryad](https://doi.org/10.5061/dryad.fn2z34v8c)

All data and analysis code are in `tangrams-ref-main.zip`; this README documents its full
contents. Unzipping produces `data/`, `analyses/`, and `experiments/` as described below.

Two participants play a *tangram reference game* over abstract shapes. Each trial, the **speaker**
sees a designated **target** and describes it; the **listener** reads the description and clicks the
image they think is the target. Neither sees the other's screen. Feedback drives partners toward
short, idiosyncratic labels ("weird 6") — the *ad hoc conventions* the study is about.

Every game runs three phases:

| Phase | Name | Trials/game | Interaction | Measures |
|---|---|---|---|---|
| 1 | pre | 40 (20 per player, alone) | none | Baseline description per tangram, before partner contact |
| 2 | interactive | 30 (5 blocks × 6) | free bidirectional chat, roles swap | Convention formation |
| 3 | post | 20 | one speaker utterance, no reply | Whether conventions transfer to **new** referents |

A phase-3 target was either discussed in phase 2 (**repeated**) or is a new tangram from the same
visual **thread** (**control**) — threads being families of visually similar shapes. Main
experiment: 302 participants, 151 games, 13,590 trials. Two earlier pilots (60 and 59 games) are
also included.

## Files

```
data/                 full_data.csv, demographics.csv, thread_contexts.csv
analyses/             analysis.qmd, pilot1.qmd, pilot2.qmd
  data/               processed tables consumed by the notebooks
experiments/          web experiment source (Empirica/Meteor); see experiments/README.md
```

## Conventions

**Tangrams** are named by their KiloGram file name, e.g. `page7-40.svg`; some columns drop the
`.svg`. The 1,016 SVGs are in `experiments/experiment/public/tangrams/`.

**Identifiers** are arbitrary labels carrying no participant information: games `G###` (pilots
`P1G###`/`P2G###`), rounds `R#####` (`P1R#####`/`P2R#####`), main-experiment participants integers
`0`–`301`, pilot participants `P1-###` / `P2-###`. The main experiment and the two pilots each
recruited a **distinct set of people**, so the three participant namespaces never overlap and must
not be joined to one another; `demographics.csv` covers the main experiment only.

**Missing data** is always an empty cell (`NA` in R, `NaN` in pandas) and is structural; the reason
is noted per variable below. No other missing-data codes.

**List-valued cells** hold a Python list literal as text, e.g. `"['page7-40.svg', 'page8-8.svg']"`;
parse with `ast.literal_eval`.

**Similarity** columns are cosine similarities unless stated. `jaccard_index` is word overlap (0–1).
`snd_value` is Shape Naming Divergence (0–1, higher = harder to name), from KiloGram.

Several processed files carry an unnamed leading column (`Unnamed: 0` or a blank header) — a pandas
row index; ignore it.

---

## `data/full_data.csv`

Main experiment, one row per trial per speaker. **13,590 rows** = 151 games × 90 trials (40 + 30 + 20).

| Variable | Type / units | Description |
|---|---|---|
| `game_id` | `G###` | Game (dyad). 151 unique. |
| `configuration_file` | string | JSON defining the game's trial sequence; see `experiments/experiment/public/games/`. |
| `phase` | 1–3 | 1 = pre, 2 = interactive, 3 = post. |
| `round_id` | `R#####` | Round. 7,550 unique — a phase-1 round is shared by both players. |
| `trial_index` | integer 0–51 | Position within the game. |
| `block` | 0–4, else empty | Repetition block in phase 2. Empty in phase 1; always `0.0` in phase 3 (no block structure). |
| `target` | string | Tangram the speaker had to describe. |
| `snd_value` | 0–1 | Shape Naming Divergence of the target. |
| `snd_class` | `low`/`high` | `low` if `snd_value <= 0.85`. |
| `chat_mode` | string, else empty | Empty in phase 1; `switch-bidirectional` in phase 2 (both may write, roles alternate); `single-utterance-unidirectional` in phase 3 (one message, no reply). |
| `speaker_id` | 0–301 | Speaker; joins to `demographics.csv:participant_id`. |
| `listener_id` | 0–301, else empty | Listener; empty in phase 1, which has none. |
| `context_id` | integer | The 10-tangram context; joins to `thread_contexts.csv`. 150 of 155 contexts occur. |
| `context` | list of strings | The 10 tangrams displayed, including the target. |
| `description` | string or list | Speaker's text. Plain string in phases 1 and 3; in phase 2 a list holding the trial's full chat in order. |
| `time_to_message` | seconds, or list | Trial onset → message sent. A list in phase 2, one entry per message. |
| `sec_until_click` | seconds, else empty | Message → listener click. Empty in phase 1 and on timed-out trials. |
| `response` | string, else empty | Tangram clicked. Empty in phase 1 and on timed-out trials (75 in phase 2, 437 in phase 3). |
| `correct` | `True`/`False`, else empty | `response == target`. Empty wherever `response` is empty. |

## `data/demographics.csv`

The 302 main-experiment participants, one row each; reduced and generalized for public release (see
**Human subjects data**). Pilot participants are not included.

| Variable | Type | Description |
|---|---|---|
| `participant_id` | 0–301 | Arbitrary number, not derived from personal information. Joins to `speaker_id`/`listener_id` in `full_data.csv` and `player_id` in `shepard_pairs*.csv`. |
| `age_range` | categorical | `18-24`, `25-34`, `35-44`, `45-54`, `55+`, or `NA`. Banded and top-coded, not exact age. |
| `sex` | `Male`/`Female`/`NA` | `NA` covers both "prefer not to say" and unavailable values. |
| `country_of_residence` | `United Kingdom`/`United States` | Residence during the study. |

Counts: 164 UK / 138 US; 163 male, 138 female, 1 `NA`; ages 18-24 (37), 25-34 (95), 35-44 (79),
45-54 (46), 55+ (43), `NA` (2). All participants were English speakers.

## `data/thread_contexts.csv`

Stimulus design. **1,550 rows** = 155 contexts × 10 tangrams.

| Variable | Type | Description |
|---|---|---|
| `context_id` | 0–154 | Joins to `full_data.csv:context_id`. |
| `thread_id` | 0–9 | The visual-similarity thread the context is drawn from. |
| `pre_post_A` | string | First member of this slot's pre/post comparison pair. |
| `pre_post_B` | string | Second member of that pair. |
| `interactive` | string | Tangram used in the interactive phase for this slot. |

Read the three tangram columns across a context's 10 rows to reconstruct which shapes were paired
for the pre/post measure and which were discussed interactively.

---

## `analyses/data/` — processed tables

Derived from `data/full_data.csv` and used directly by the notebooks. Supplied ready-made so the
analyses re-run without recomputing embeddings.

### `clean_no_discourse.csv` — interactive trials, cleaned

**4,449 rows.** Phase-2 trials, minus those whose chat was purely discourse management.

| Variable | Type / units | Description |
|---|---|---|
| `game_id` | `G###` | Game. |
| `block` | 0–4 | Repetition block. |
| `target`, `response` | string | Target tangram; tangram clicked. |
| `correct` | `True`/`False`, else empty | Empty on 4 timed-out trials. |
| `controlled` | `True`/`False` | `True` = **control** target (not repeated across phases), `False` = **repeated**. `analysis.qmd` recodes this to `condition` (`control`/`repeated`). |
| `snd_value`, `snd_class` | 0–1; `low`/`high` | SND of the target, and its binarization. |
| `sec_until_click` | seconds | Message → listener click. |
| `speaker_desc` | list of strings | All speaker messages this trial. |
| `listener_desc` | list of strings | All listener messages (empty list if none). |
| `speaker_len`, `listener_len`, `total_len` | words | Word counts of the above, and their sum. |
| `chat_len` | messages | Messages exchanged this trial. |

### `pre_post.csv` — pre/post description similarity

**2,948 rows** = 1,474 tangram pairs × 2 phases. The central test of generalization.

| Variable | Type / units | Description |
|---|---|---|
| `phase` | `pre`/`post` | Descriptions from phase 1 or phase 3. |
| `pair-id` | integer | Tangram pair; appears once as `pre`, once as `post`. |
| `game` | `G###` | Game. |
| `tangrams` | list of 2 strings | The pair, with `.svg`. |
| `tangram_A`, `tangram_B` | string | The two tangrams, without extension. |
| `p1_description`, `p2_description` | string | Descriptions given for `tangram_A` and `tangram_B` this phase. |
| `similarity` | cosine | Text-embedding similarity of the two descriptions. **Main dependent measure.** |
| `is_control` | `True`/`False` | `True` = control (non-repeated) pair. |
| `tangram1_snd`, `tangram2_snd` | 0–1 | SND of each pair member. |
| `prepost_avg_snd` | 0–1 | Mean SND of the pair. |
| `interactive_phase_tangram` | string | Same-thread tangram actually discussed in phase 2. |
| `interactive_phase_snd` | 0–1 | Its SND. |
| `thread_avg_snd` | 0–1 | Mean SND across the thread. |
| `thread_id` | 0–9 | Visual-similarity thread. |
| `bin` | 0–9 | Design bin the context was sampled into (equals `thread_id` here). |
| `context_id` | integer | Joins to `thread_contexts.csv`. |
| `sim_A_interactive`, `sim_B_interactive` | cosine | Image similarity of `tangram_A` / `tangram_B` to the interactive-phase tangram. |
| `avg_sim_AB_interactive` | cosine | Mean of the two. |
| `jaccard_index` | 0–1 | Word overlap between the two descriptions. |

### `shepard_pairs.csv` — phase-2 vs. phase-3 pairs

**2,988 rows.** Relates description similarity to visual similarity (a Shepard-style generalization
gradient).

| Variable | Type / units | Description |
|---|---|---|
| `player_id` | 0–301 | Participant; 301 of 302 appear. |
| `is_same_thread` | `True`/`False` | Whether the two tangrams share a thread. Balanced, 1,494 each. |
| `phase2_image`, `phase2_text` | string | Tangram described in phase 2, and its description. |
| `phase3_image`, `phase3_text` | string | Tangram described in phase 3, and its description. |
| `phase2_thread`, `phase3_thread` | list of strings | The thread each image belongs to. |
| `image_sim` | cosine | Visual-embedding similarity of the two images. |
| `text_sim` | cosine | Text-embedding similarity of the two descriptions. |

### `shepard_pairs_pixsim.csv`

Same 2,988 rows and columns as `shepard_pairs.csv` (`player_id` uses the same numbering), plus three
model-free image measures for comparison against `image_sim`:

| Variable | Type / units | Description |
|---|---|---|
| `jaccard_index` | 0–1 | Word overlap between `phase2_text` and `phase3_text`. |
| `pixel_sim` | 0–1 | Pixel-overlap similarity of the two rendered tangrams. |
| `pixel_corr` | −1–1 | Pearson correlation of the two images' pixel values. |

### `block_sim_ada_jaccard.csv` — convergence across blocks

**596 rows** = 149 games × 4 consecutive block pairs.

| Variable | Type / units | Description |
|---|---|---|
| `game_id` | `G###` | Game. |
| `blocks` | `(n,n+1)` | Blocks compared: `(0,1)`, `(1,2)`, `(2,3)`, `(3,4)`. |
| `ada_cos_sim` | cosine | Text-embedding similarity between the two blocks' descriptions. |
| `jaccard_index` | 0–1 | Word overlap between them. |

### `voting_text_embed_similarity.csv` — human validation of text similarity

**1,474 rows.** Annotators judged which of two description pairs was more similar; compared against
three embedding models.

| Variable | Type / units | Description |
|---|---|---|
| `key` | string | `<game_id>-<tangram_A>-<tangram_B>`, e.g. `G133-page2-21-page7-10`. Tangram names themselves contain hyphens. |
| `tangram_A`, `tangram_B` | string | The pair judged. |
| `ori_pre`, `ori_post` | string | The two phase-1 / phase-3 descriptions, joined by ` \| `. |
| `controlled_thread` | `True`/`False` | Whether this is a control thread. |
| `ada_pre_sim`, `ada_post_sim` | cosine | Similarity from OpenAI `ada` text embeddings. |
| `clip_pre_sim`, `clip_post_sim` | cosine | Same, CLIP text embeddings. |
| `sbert_pre_sim`, `sbert_post_sim` | cosine | Same, Sentence-BERT. |
| `pre_sim`, `post_sim` | cosine | Values used downstream (`ada`). |
| `gt`, `eq`, `lt` | vote counts | Annotators judging the post pair *more* / *equally* / *less* similar than the pre pair. Blank for 2 items with no votes. |
| `human_judgement` | −1/0/1, else empty | Majority verdict: `1` = post more similar, `0` = equal, `-1` = less. Empty for 27 items with no majority. Modeled as an ordered factor. |
| `ada_diff`, `clip_diff`, `sbert_diff` | numeric | `post_sim − pre_sim` per model — the model's analogue of `human_judgement`. |

### `voting_image_embed_similarity.csv` — human validation of image similarity

**1,494 rows.** Annotators compared two image pairs on visual similarity.

| Variable | Type / units | Description |
|---|---|---|
| `key` | string, 20 chars | Arbitrary annotation-item key. Not linked to any participant. |
| `pair0_phase2_image`, `pair0_phase3_image` | string | The first image pair shown. |
| `pair1_phase2_image`, `pair1_phase3_image` | string | The second image pair shown. |
| `pair0_image_sim`, `pair1_image_sim` | cosine | Image-embedding similarity of each pair. |
| `gt`, `eq`, `lt` | vote counts | Votes that pair 0 was more / equally / less similar than pair 1. |
| `human_judgement` | −1/0/1, else empty | Majority verdict. Empty for 36 items with no majority. |
| `sim_diff` | numeric | `pair0_image_sim − pair1_image_sim`. |

### `pilot1_data.csv`, `pilot2_data.csv`

**1,800 rows** (60 games) and **2,360 rows** (59 games). Single-phase pilots, both
`single-utterance-unidirectional` only, each run with its own distinct set of participants.
Columns match `full_data.csv` except:

| Variable | Type / units | Description |
|---|---|---|
| `game_id`, `round_id` | `P1G###`/`P2G###`, `P1R#####`/`P2R#####` | Pilot-specific identifiers. |
| `speaker_id`, `listener_id` | `P1-###` / `P2-###` | Pilot participants (120 in pilot 1, 118 in pilot 2), numbered separately per pilot. No pilot participant took part in the other pilot or in the main experiment. |
| `sec_until_press` | seconds | Time until the speaker began typing. |
| `sec_until_click` | `(n,)` | Seconds until the listener clicked, as a 1-tuple literal — strip parentheses and trailing comma. |
| `description_len` | words | Word count of `description`. |
| `controlled` | `True`/`False` | Control vs. repeated target. |

---

## Software and workflow

**Analyses** are Quarto notebooks in R. Render with `quarto render analyses/analysis.qmd` or run the
chunks in RStudio; paths resolve via the `here` package, so run from the repository root.

| Notebook | Reads | Covers |
|---|---|---|
| `analysis.qmd` | `clean_no_discourse`, `pre_post`, `shepard_pairs`, `shepard_pairs_pixsim`, `block_sim_ada_jaccard`, `voting_text_embed_similarity` | All main results: convention formation (accuracy, description length, response time, utterance similarity), pre/post generalization, similarity-gradient models, human-vs-embedding validation |
| `pilot1.qmd`, `pilot2.qmd` | `pilot1_data`, `pilot2_data` | The two pilots |

R packages: `tidyverse`, `here`, `ggthemes`, `tidyboot`, `lme4`, `lmerTest`, `brms`. `brms` needs a
Stan toolchain and is the slowest step. Embedding-derived columns (`ada_*`, `clip_*`, `sbert_*`,
`image_sim`, `similarity`) were computed ahead of time, so re-running needs no API access or GPU.

**The experiment** is a Meteor app on the [Empirica](https://empirica.ly/) framework —
`experiments/experiment/` (main) and `experiments/pilot/`, each with `client/`, `server/`, and
`public/`. Setup and deployment are in `experiments/README.md`. Under `public/`:
`tangrams/` holds the 1,016 stimulus SVGs; `games/` holds 310 JSON files
(`ref2_pilot5_binned_threads_<context_id>_<phase>.json`, matching `full_data.csv:configuration_file`)
that predefine each trial's images, target, block, per-player ordering, roles, and chat mode;
`games/old_games/` holds superseded configurations not used by the released data;
`packages/meteor-empirica-core/` is a vendored third-party copy of Empirica, included so the app
builds reproducibly.

Tangram stimuli and the `snd_value` norms come from the
[KiloGram dataset](https://github.com/lil-lab/kilogram/tree/main/dataset).

## Human subjects data

Participants were adults recruited online. All consented to take part and to public release of their
de-identified data. No minors took part (minimum age 18). This release contains no direct
identifiers. The de-identification procedure was:

1. **Platform identifiers removed.** Recruitment-platform accounts were never carried into the
   release; each participant has an arbitrary label not derived from personal information and not
   reversible (`0`–`301` for the main experiment, `P1-###` / `P2-###` for the pilots, numbered
   separately because the three studies recruited distinct people).
2. **Internal database identifiers replaced.** The Empirica/Meteor server's record ids for every
   game, round, and player were replaced with arbitrary labels (`G001`, `R00001`, …), so nothing
   traces back to the original experiment server.
3. **Indirect identifiers limited to three** — `age_range`, `sex`, `country_of_residence`. Ethnicity,
   country of birth, nationality, language, student status, and employment status were removed.
4. **Age generalized** into bands, top-coded at `55+` so no older participant is isolated.
5. **Free text screened** for names, contact details, locations, ages, and self-descriptions. One
   message where a participant volunteered their age was redacted in place as
   `[self-disclosed age redacted]`; no other disclosures were found.
