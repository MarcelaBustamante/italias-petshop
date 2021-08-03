<script>
  //pages
  import Login from "./pages/Login.svelte";
  import ProductTemplate from "./pages/ProductTemplate.svelte";
  import Products from "./pages/Products.svelte";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Navbar from "./components/Navbar/Navbar.svelte";
  import Cart from "./components/Cart/Cart.svelte";
  //router
  import { Router, Link, Route } from "svelte-routing";
  import Sidebar from "./components/Navbar/Sidebar.svelte";
  //alert
  import Alert from './components/Alert.svelte';
  //global store
  import globalStore from "./stores/globalStore";
import Checkout from "./pages/Checkout.svelte";
</script>

<Router>
  <Navbar />
  {#if $globalStore.sidebar}
    <Sidebar />
  {/if}
  <Navbar />
  {#if $globalStore.cart}
    <Cart />
  {/if}
  {#if $globalStore.alert}
    <Alert />
  {/if}
  
  <div>
    <Route path="/checkout" component={Checkout} />
    <Route path="/login" component={Login} />
    <Route path="/products" component={Products} />
    <Route path="/products/:id" component={ProductTemplate} />
    <Route path="/about" component={About} />
    <Route path="/" component={Home} />
  </div>
</Router>
