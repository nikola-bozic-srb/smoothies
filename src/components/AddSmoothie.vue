<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie</h2>
    <form @submit.prevent="AddSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="Title" />
      </div>
      <div v-for="(ing, index) in Ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="Ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient"
          >Add an ingredient (press tab to add):</label
        >
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="AddIng"
          v-model="Another"
        />
      </div>
      <div class="field center-align">
        <p v-if="Feedback != null" class="red-text">{{ Feedback }}</p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "AddSmoothie",
  data() {
    return {
      Title: null,
      Another: null,
      Ingredients: [],
      Feedback: null,
      Slug: null,
    };
  },
  methods: {
    AddSmoothie() {
      if (this.Title != null) {
        this.Feedback = null;

        //create slug
        this.Slug = slugify(this.Title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });

        db.collection("smoothies")
          .add({
            Title: this.Title,
            Ingredients: this.Ingredients,
            Slug: this.Slug,
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.Feedback = "You must enter a smoothie title";
      }
    },
    AddIng() {
      if (this.Another != null) {
        this.Ingredients.push(this.Another);
        this.Another = null;
        this.Feedback = null;
      } else {
        this.Feedback = "You must enter a value to add ingredient";
      }
    },
    deleteIng(ing) {
      this.Ingredients = this.Ingredients.filter((ingredient) => {
        return ing != ingredient;
      });
    },
  },
};
</script>

<style >
.add-smoothie {
  margin-top: 50px;
  padding: 20px;
  max-width: 500px;
}

.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-smoothie .field {
  margin: 20px auto;
  position: relative;
}

.add-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>