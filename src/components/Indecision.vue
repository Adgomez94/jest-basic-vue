<template>
  <img v-if="image" :src="image" alt="bg" />
  <div class="bg-dark"></div>

  <div class="indecision-container">
    <input type="text" placeholder="Realiza una pregunta" v-model="question" />
    <p>Recuerda Terminar con un signo de interrogacion (?)</p>
    <div v-if="isValidQuestion">
      <h2>{{question}}</h2>
      <h1>{{answer}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Indecision",
  data() {
    return {
      question: '',
      answer: null,
      image : null,
      isValidQuestion: false
    }
  },
  methods: {
    async getAnswer() {
      this.answer = 'Pensando...'
      const URL = await fetch('https://yesno.wtf/api')
      const { answer, image } = await URL.json()
      
      this.isValidQuestion = true

      this.answer = answer === 'yes' ? 'Si' : 'No'
      this.image  = image
    }
  },
  // Estara observando question y siempre tiene que ser la funcion con el numbre de la variable que quieres observar
  watch:{
    question(value, oldValue){
      console.log({value})
      this.isValidQuestion = false
      if( !value.includes('?') ) return

      this.getAnswer()
    }
  }
};
</script>

<style>
img,
.bg-dark {
  height: 100vh;
  left: 0px;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0px;
  width: 100vw;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
  position: relative;
  z-index: 99;
}

input {
  width: 250px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
}
input:focus {
  outline: none;
}

p {
  color: white;
  font-size: 20px;
  margin-top: 0px;
}

h1,
h2 {
  color: white;
}

h2 {
  margin-top: 150px;
}
</style>