import { writable, derived } from "svelte/store";
import getProducts from "../strapi/getProducts";
import url from "../strapi/URL";
const store = writable([],()=>{
  setProducts();
  return ()=>{}
});
async function setProducts (){
  let products =await getProducts();
  if(products){
    products = flattenProducts(products);
    store.set(products);
  }
}
// subscribe
// set
// update

// flatten products
function flattenProducts(data) {
  return data.map(item => {
    //for cloudinary
    let image = item.image[0].url;
    //for local
    //let image = `${url}${item.image[0].url}`
    return { ...item, image };
  });
}
// featured store
export const featuredStore = derived(store, $featured => {
  return $featured.filter(item => item.featured === true);
});
export default store;
