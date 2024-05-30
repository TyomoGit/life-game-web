use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub struct GameWrapper {
    game: life_game_lib::game::Game,
}

#[wasm_bindgen]
impl GameWrapper {
    #[wasm_bindgen(constructor)]
    pub fn new(width: usize, height: usize, is_torus: bool) -> Self {
        // log(format!("w: {}, h: {}", width, height).as_str());
        Self {
            game: life_game_lib::game::Game::new_random(width, height, is_torus),
        }
    }

    pub fn step(&mut self) {
        self.game.step();
    }

    pub fn board(&self) -> Vec<u8> {
        self.game
            .board()
            .iter()
            .flatten()
            .map(|&alive| alive as u8)
            .collect()
    }
}
