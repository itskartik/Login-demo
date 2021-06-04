export default function({ store, redirect }) {
  return store
    .dispatch("getUser")
    .then(res => {})
    .catch(err => {
      console.log("error" + err);
      redirect("/signin");
    });
}

//todo rewrite the middleware use actions to create this and call here....
