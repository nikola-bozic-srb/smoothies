<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{ smoothie.Title }}</h2>
    <form @submit.prevent="EditSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="smoothie.Title" />
      </div>
      <div
        v-for="(ing, index) in smoothie.Ingredients"
        :key="index"
        class="field"
      >
        <label for="ingredient">Ingredient:</label>
        <input
          type="text"
          name="ingredient"
          v-model="smoothie.Ingredients[index]"
        />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient (press tab to add):</label>
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="AddIng"
          v-model="Another"
        />
      </div>
      <div class="field center-align">
        <p v-if="Feedback != null" class="red-text">{{ Feedback }}</p>
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from 'slugify'
export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      Another: null,
      Feedback: null,
    };
  },
  methods: {
    EditSmoothie() {
      if (this.smoothie.Title != null) {
        this.Feedback = null;

        //create slug
        this.smoothie.Slug = slugify(this.smoothie.Title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });

        db.collection("smoothies").doc(this.smoothie.id)
          .update({
            Title: this.smoothie.Title,
            Ingredients: this.smoothie.Ingredients,
            Slug: this.smoothie.Slug,
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
        this.smoothie.Ingredients.push(this.Another);
        this.Another = null;
        this.Feedback = null;
      } else {
        this.Feedback = "You must enter a value to add ingredient";
      }
    },
    deleteIng(ing) {
      this.smoothie.Ingredients = this.smoothie.Ingredients.filter(
        (ingredient) => {
          return ing != ingredient;
        }
      );
    },
  },
  created() {
    let ref = db
      .collection("smoothies")
      .where("Slug", "==", this.$route.params.smoothie_slug);
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      });
    });
  },
};
</script>

<style>
.edit-smoothie {
  margin-top: 50px;
  padding: 20px;
  max-width: 500px;
}

.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-smoothie .field {
  margin: 20px auto;
  position: relative;
}

.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>