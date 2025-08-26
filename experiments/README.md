# Tangram reference game

This reference game experiment is powered by
[Empirica](https://empirica.ly/) (here is a basic
[tutorial](https://www.youtube.com/watch?v=K2YhEZey_58&list=PLPQelvUwyVgiawBDk3Sp74QMfL8RPgORW&index=1)).

## Testing

To develop locally, 

1. make sure you [have meteor installed](https://www.meteor.com/install), 
2. clone the repo, navigate to the experiment `/experiment/`, and run `meteor npm install` to get the dependencies
3. configure `settings.json` and launch locally with `meteor --settings settings.json` 
4. go to `http://localhost:3000/admin` in your browser
5. click the 'import' button and select `config.yaml` 
6. click 'new batch' to start a game, select the `random_game` treatment, and go to `localhost:3000` in a new tab to join the experiment as a user 

## Deployment

Deployment is configured in `settings.json`.

### Game data

Games are predefined in `pilot/experiment/public/games` and `experiments/experiment/public/games`.

### Create a new game

Go to `https://tangrams-ref.meteorapp.com/admin`. If prompted, use username `lil-lab` and password `tangrams-ref-dev` to log in as admin.

Click on `New Batch`. Select `random_game` as treatment. Then click `Create Batch`.