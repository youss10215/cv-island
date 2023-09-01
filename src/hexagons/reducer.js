export const SET_HEGAGONS = 'set-hexagons';
export const SET_POSITION = 'set-position';
export const SET_SIZE = 'set-size';



export default (state, { type, payload }) => {
  switch (type) {
    case SET_HEGAGONS: {
      const { hexagons } = payload;
      return {
        ...state,
        hexagons
      };
    }
    case SET_SIZE: {
      const { counter } = payload;
      return {
        ...state,
        size: counter
      };
    }
    case SET_POSITION: {
      const { snowTreePositions, snowtree } = payload;
      return {
        ...state,
        snowTreePositions: [...snowTreePositions],
        snowtree
      };
    }
    default:
      return state;
  }
};