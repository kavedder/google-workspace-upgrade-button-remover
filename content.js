function waitForButton(buttonLabel, dataPepId, timeout = 5000) {
    return new Promise((resolve, reject) => {
        // find by aria-label
        const ariaLabelSelector = `[aria-label="${buttonLabel}"]`;
        const elementByAriaLabel = document.querySelector(ariaLabelSelector);

        // find by div data-pep-id
        const dataPepIdSelector = `div[data-pep-id="${dataPepId}"]`
        const elementByDataPepId = document.querySelector(dataPepIdSelector);

        // find by text (total fallback)
        const spans = Array.from(document.querySelectorAll('span'));
        const elementByLabelMatch = spans.find(el => el.textContent.trim() === buttonLabel);

        if (elementByAriaLabel) {
            console.log('a');
            return resolve(elementByAriaLabel);
        } else if (elementByDataPepId) {
            console.log('b');
            return resolve(elementByDataPepId);
        } else if (elementByLabelMatch) {
            console.log('c');
            const parentButton = elementByLabelMatch.closest('button');
            return resolve(parentButton);
        }

        const observer = new MutationObserver(() => {
            const elByAriaLabel = document.querySelector(ariaLabelSelector);

            const elByDataPepId = document.querySelector(dataPepIdSelector);

            const spans = Array.from(document.querySelectorAll('span'));
            const elByLabelMatch = spans.find(el => el.textContent.trim() === buttonLabel);

            if (elByAriaLabel) {
                observer.disconnect();
                console.log('d');
                resolve(elByAriaLabel);
            } else if (elByDataPepId) {
                observer.disconnect();
                console.log('e');
                resolve(elByDataPepId);
            } else if (elByLabelMatch) {
                observer.disconnect();
                const parentButton = elByLabelMatch.closest('button');
                console.log('f');
                resolve(parentButton);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Timeout waiting for button: "${buttonLabel}"`));
        }, timeout);
    });
}

waitForButton('Upgrade', 'global-pep-gmail').then(el => {
    console.log('Found button', el);
    el.remove();
});
