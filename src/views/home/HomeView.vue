<template>
  <div class="home-page dark:bg-gray-800 container mx-auto px-4 py-8">
    <!-- Başlık -->
    <header class="text-center mb-12">
      <h1 class="text-5xl font-bold text-gray-800 dark:text-white mb-4">SYFony ile Sorularınızı Anında Cevaplayın</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        İster fotoğraf çekin, ister dosya yükleyin, ister yazın - SYFony her ihtiyaca uygun bir çözüm sunar.
      </p>
    </header>

    <!-- Özellikler Bölümü -->
    <section class="features grid md:grid-cols-3 gap-8 text-center mb-12">
      <!-- Fotoğraf Çekme -->
      <div class="feature-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <span class="material-icons">photo_camera</span>
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Fotoğraf Çekin</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Kameranızı kullanarak sorularınızı fotoğraflayın ve hızlı bir şekilde yanıt alın.
        </p>
      </div>

      <!-- Dosya Yükleme -->
      <div class="feature-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <span class="material-icons ">add_photo_alternate</span>
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Dosya Yükleyin</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Bilgisayar veya telefonunuzdan dosya yükleyerek, sorunuzu en rahat şekilde iletin.
        </p>
      </div>

      <!-- Metin Gönderme -->
      <div class="feature-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <span class="material-icons ">description</span>        
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Metin Gönderin</h3>
        <p class="text-gray-600 dark:text-gray-300">
          Yazılı olarak sorunuzu iletin, anında cevap alın. Her an, her yerde kullanım kolaylığı.
        </p>
      </div>
    </section>

    <!-- SYFony Hakkında -->
    <section class="about-syfony text-center mb-12">
      <h2 class="text-3xl font-semibold text-gray-800 dark:text-white mb-8">SYFony Nedir?</h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
        SYFony, sorularınızı hızlı bir şekilde çözmek için geliştirilmiş bir platformdur. Kullanıcıların
        herhangi bir konuda merak ettikleri soruları fotoğraf, dosya veya yazı yoluyla iletmelerine
        olanak tanır. Güçlü altyapısı sayesinde tüm sorular en kısa sürede yanıtlanır.
      </p>
     
    </section>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.home-page {
  font-family: Arial, sans-serif;
}
</style>
