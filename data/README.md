# Experiment Data
`full_data.csv` contains all data from the main experiment. Processed versions for analyses are under `analyses/data`.

Tangrams are from the KiloGram dataset: `https://github.com/lil-lab/kilogram/tree/main/dataset`.

## Columns description
- **game_id**: Unique identifier for each game.  
- **configuration_file**: Name of the configuration file used to set up the game. See jsons under `experiments/experiment/public/games`.
- **phase**: Phases of the experiment (e.g., 1=pre, 2=interactive, 3=post).  
- **round_id**: Unique identifier for each round.  
- **trial_index**: Sequential index of each rounds within a game. 90 trials each game: 20*2 (phase 1) + 30 (phase 2) + 20 (phase3).  
- **block**: Block number in interactive phase.  
- **target**: The target tangram.  
- **snd_value**: SND (Shape Naming Divergence) value (additive inverse of nameability).  
- **snd_class**: `low` if SND <= 0.85 and `high` otherwise.  
- **chat_mode**: `NaN` for phase 1 (non-interactive), `switch-bidirectional` for phase 2, `single-utterance-unidirectional` for phase 3.  
- **speaker_id**: Anonymized ID of the speaker.  
- **listener_id**: Anonymized ID of the listener.  
- **context_id**: Index for the context (set of 10 tangrams). See `thread_contexts.csv` for thread and context correspondence. 
- **context**: Set of tangrams in the context.  
- **description**: Text description provided by the speaker.  
- **time_to_message**: Time (seconds) the speaker takes to send a message.  
- **sec_until_click**: Time (seconds) until the listener clicks on a tangram after receiving the message from the speaker.  
- **response**: Listener’s selected item.  
- **correct**: Whether the response matched the target (true/false).  

