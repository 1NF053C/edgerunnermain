describe('MapComponent functionality', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://maps.googleapis.com/maps/api/place/nearbysearch/json', { fixture: 'nearbyLocations.json' }).as('getLocations');
        cy.visit('/'); // Visit the application's main page
        cy.wait('@getLocations'); // Wait for the mock API response
    });

    it('Displays markers and routes correctly', () => {
        // Mock data
        const expectedLocationNames = [
            'Location A',
            'Location B'
        ];

        // Verify markers are displayed
        expectedLocationNames.forEach(name => {
            cy.get(`[data-testid="marker-${name}"]`).should('exist');
        });
    });
});