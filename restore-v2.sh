#!/bin/bash
# Quick verification that landing page was restored
echo "Landing page: $(wc -l < v2-ghl-landing-page.html) lines"
echo "Product page: $(wc -l < v2-ghl-product-page.html) lines"
echo "Checkout page: $(wc -l < v2-ghl-checkout-page.html) lines"
echo "OTO page: $(wc -l < v2-ghl-oto-upsell.html) lines"
echo "Thank you page: $(wc -l < v2-ghl-thankyou.html) lines"
