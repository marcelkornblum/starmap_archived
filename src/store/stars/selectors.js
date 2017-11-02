export const selectRegionStars = state => state.stars.stars;
export const selectRegionStarIds = state => state.stars.stars.map(i => i.id);
export const selectStarById = (state, id) => state.stars.stars.find(i => i.id === id);
