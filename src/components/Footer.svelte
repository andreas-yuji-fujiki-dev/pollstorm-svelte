<script>
  const date = new Date()
  const currentYear = date.getFullYear()
</script>

<footer class="app-footer">
  <span>
    Pollstorm {currentYear} | All rights reserved
  </span>
</footer>

<style>
  .app-footer{
    width: 100dvw;
    background-color: #fff;
    position: fixed;
    bottom: 0;

    height: 10dvh;
    font-size: 1.1rem;
    
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>