from playwright.sync_api import sync_playwright

def verify_ui_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a desktop viewport size
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        # Load the index file directly
        # Ensure you use the absolute path or relative from where you run
        # Since I'm in root, `file://` + absolute path is safest
        import os
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/index.html")

        # Wait for the page to be "loaded" (loader hidden)
        page.wait_for_selector('body.loaded')

        # Take a screenshot of the Desktop Orrery View
        page.screenshot(path="/home/jules/verification/desktop_orrery.png")
        print("Desktop Orrery screenshot taken.")

        # Simulate interaction: Click on a node (e.g., first node)
        # We need to wait for nodes to be generated.
        page.wait_for_selector('.site-node')
        nodes = page.locator('.site-node')
        if nodes.count() > 0:
            nodes.first.click()

            # Wait for detail view transition
            page.wait_for_selector('#detail-view', state='visible')
            # Wait for content animations
            page.wait_for_timeout(2000)

            page.screenshot(path="/home/jules/verification/desktop_detail.png")
            print("Desktop Detail screenshot taken.")

            # Close detail view
            page.click('.back-button')
            page.wait_for_selector('#detail-view', state='hidden')

        # Mobile verification
        # Create a new context/page for mobile
        mobile_page = browser.new_page(
            viewport={"width": 375, "height": 812},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
        )
        mobile_page.goto(f"file://{cwd}/index.html")
        mobile_page.wait_for_selector('body.loaded')

        # Wait for mobile cards
        mobile_page.wait_for_selector('.mobile-card')

        mobile_page.screenshot(path="/home/jules/verification/mobile_home.png")
        print("Mobile Home screenshot taken.")

        # Click a card
        cards = mobile_page.locator('.mobile-card')
        if cards.count() > 0:
            cards.first.click()

            mobile_page.wait_for_selector('#detail-view', state='visible')
            mobile_page.wait_for_timeout(2000)

            mobile_page.screenshot(path="/home/jules/verification/mobile_detail.png")
            print("Mobile Detail screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_ui_changes()
