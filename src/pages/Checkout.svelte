<script>
  import About from "./About.svelte";

  import { onMount } from "svelte";
  import { navigate, link } from "svelte-routing";
  import user from "../stores/user";
  import cart,{ cartTotal } from "../stores/cart";
  import submitOrder from '../strapi/submitOrder';
  import globalStore from '../stores/globalStore';
  let name = "";
  // stripe vars
  let cardElement;
  let cardErrors;
  let card;
  let stripe;
  let elements;
  $: isEmpty = !name;
  onMount(() => {
    if (!$user.jwt) {
      navigate("/");
      return;
    } 
   // if($cartTotal > 0)
    //stripe= Stripe("pk_test_123");
    //elements = stripe.elements();
    //card = elements.create('card');
   // card.mount(cardElement);
   // card.addEventListener("change", function(event){
       // if(event.error){
            //cardErrors.textContent = event.error.message
       // } else{
        //    cardErrors.textContent = "";
       // }
    //});
});
  async function handleSubmit() {
    globalStore.toggleItem("alert",true,"Enviando orden...por favor espere.")
    let order = await submitOrder({
        name, total: $cartTotal,
        items: $cart, userToken: $user.jwt});
       if(order){
         globalStore.toggleItem("alert",true,"Su orden se ha completado, nos estaremos comunicando por mail para arreglar los detalles.");
         cart.set([]);
         logalStorage.setItem('cart',JSON.stringify([]));
         navigate('/');
         return
       } else { 
         globalStore.toggleItem('alert',true,"hubo un error con la orden, por favor intente de nuevo.")
       }

    //let response = {"token":{"id": "tok_123aFe"}}//await stripe.createToken(card).catch(error=>console.log(error))
   // const { token } = response;
   // if(token){
      //  console.log(response)
        //token.id
        //submit the order
   // } else {
     //   console.log(response)
    //}

   //store the order in strapi
  }
</script>

{#if $cartTotal > 0}
  <section class="form">
    <button
          class="btn-close"
          on:click={() => {
             navigate("/");
          }}
        >
          <i class="fas fa-window-close" />
        </button>
    <h2 class="section-title">checkout</h2>
    <form class="checkout-form" on:submit|preventDefault={handleSubmit}>
      <h3>orden total : ${$cartTotal}</h3>
      <!-- single input -->
      <div class="form-control">
        <label for="name">Tu nombre</label>
        <input type="text" id="name" bind:value={name} />
      </div>
      <!-- end of single input -->
      <!-- stripe stuff -->
      <!-- <div class="stripe-imput">
       
        <label for="card-element">Tarjetas Credito o Debito</label>
        <p class="stripe-info">
          Test usando esta tarjeta de credito:
          <span>4242 4242 4242 4242</span>
          <br />
          zip code
          <br />
          ingrese 3 digitos para el CVC
        </p>
        <div id="card-element" bind:this={cardElement}>
        </div>
        <div id="card-errors" bind:this={cardErrors} role="alert" />
      </div> -->
      <!-- end of stripe stuff -->
      <!-- errer message -->
      {#if isEmpty}
        <p class="form-empty">por favor llene el campo nombre</p>
      {/if}
      <!-- submit button-->
      <button
        type="submit"
        class="btn btn-block btn-primary"
        disabled={isEmpty}
        class:disabled={isEmpty}
      >
        confirmar pedido</button
      >
    </form>
  </section>
{:else}
  <h2>tu bolsa esta vacía</h2>
  <a href="/products" use:link class="btn btn-primary"> Buscar productos</a>
{/if}
