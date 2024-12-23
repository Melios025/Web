export class Product {
    game_name?: string;
    game_price?: string;
    game_base_view?: string;
  
    constructor(userResponse: { game_name: string; game_price: string; game_base_view: string }) {
      this.game_name = userResponse.game_name;
      this.game_price = userResponse.game_price;
      this.game_base_view = userResponse.game_base_view;
    }
  }