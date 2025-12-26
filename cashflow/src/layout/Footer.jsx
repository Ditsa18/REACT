function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>© {year} CashFlow</p>

      <div className="footer-links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Support</a>
      </div>

      <p className="footer-credit">Built with React</p>
    </footer>
  )
}

export default Footer
