<script>
    import loginUser from '../strapi/loginUser';
    import registerUser from '../strapi/registerUser';
    import { navigate } from 'svelte-routing';
    import globalStore from '../stores/globalStore'
    let email = '';
    let password = '';
    let username = 'default username';
    let isMember = true;
//add alert
    $: isEmty = !email || !password || !username || $globalStore.alert;
    //toggle member
    function toggleMember(){
        isMember = !isMember
    if(!isMember){
        username = '';
    } else{
        username = 'default username'
    }
    }

    //handle submit
    async function handleSubmit(){
       // add alert
       globalStore.toggleItem("alert",true,"Cargando datos...porfavor espera.!");
       let user;
       if(isMember){
          user = await loginUser({email,password});
       } else{
           user = await registerUser({email, password, username});
       }
       console.log(user)
       if(user){
        navigate("/products");
        globalStore.toggleItem("alert",true,"Bienvenido a Italia's petshop!")
        //add alert
        return;
       } 
       //add alert
       globalStore.toggleItem("alert",true,"Hubo un error! por favor intente denuevo",true)
    }
</script>

<section class="form">
    <h2 class="section-title">
        {#if isMember} sign in{:else}register{/if}
    </h2>
    <form class="login-form" on:submit|preventDefault ="{handleSubmit}">
    <!-- single input -->
    <div class="form-control">
        <label for="email">email</label>
        <input type="email" id="email" bind:value={email}/>
    </div>
         <!-- single input -->
         <div class="form-control">
            <label for="password">password</label>
            <input type="password" id="email" bind:value={password}/>
        </div>
        <!-- end of sigle input-->
    <!-- end of sigle input-->
    {#if !isMember}
    <!-- single input -->
    <div class="form-control">
        <label for="username">username</label>
        <input type="text" id="email" bind:value={username}/>
    </div>
    <!-- end of sigle input-->
    {/if}
    {#if isEmty}
      <p class="form-empty">por favor llene todos los campos</p>  
    {/if}
    <!-- svelte-ignore missing-declaration -->
    <button type="submit" class="btn btn-block btn-primary" disabled={isEmty} class:disabled={isEmty}>
    submit</button>
    {#if isMember}
    <p class="register-link">necesitas registrarte?
        <button type="button" on:click="{toggleMember}">Click aquí</button>
    </p>
    {:else} 
    <p class="register-link">necesitas registrarte?
        <button type="button" on:click="{toggleMember}">Click aquí</button>
    </p>
    {/if}
    </form>
</section>