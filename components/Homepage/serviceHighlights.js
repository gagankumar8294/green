import styles from './servicHighlights.module.css'

function ServiceHighlights() {
    return (
        <>
            {/* SERVICE HIGHLIGHTS */}
            {/* PLANT PROMISE */}
            <section className={styles.plantPromise}>
            <div className={styles.promiseGrid}>
                
                <div className={styles.promiseCard}>
                <span className={styles.promiseIcon}>🚚</span>
                <h3>Free Shipping Across India</h3>
                <p>On purchases above ₹1000 greenery delivered to your doorstep.</p>
                </div>

                <div className={styles.promiseCard}>
                <span className={styles.promiseIcon}>🔄</span>
                <h3>Free Replacement Guarantee</h3>
                <p>If plants arrive damaged, we replace them — no questions asked.</p>
                </div>

                <div className={styles.promiseCard}>
                <span className={styles.promiseIcon}>🌱</span>
                <h3>Plant Care Support</h3>
                <p>Free guidance from experts.</p>
                </div>

                <div className={styles.promiseCard}>
                <span className={styles.promiseIcon}>💧</span>
                <h3>3–7 Days Safe Delivery</h3>
                <p>Well-packed plants with care tips & expert support included.</p>
                </div>

            </div>
            </section>

        </>
    )
}

export default ServiceHighlights;