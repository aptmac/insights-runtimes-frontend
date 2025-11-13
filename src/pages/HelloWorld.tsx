import React from 'react';
import { Card } from '@patternfly/react-core';

/**
 * The RuntimesProcessesCard is a component exported using federated modules
 * to display runtimes-inventory information on the Insights > Systems pages.
 *
 * The RuntimesProcessesCard is comprised of a couple of nested components.
 *
 * If the get request to fetch JvmInstance data successfully returns instances,
 * then delegate to InventorySystemPropertiesCard, which mimics the look and
 * feel of the LoadingCard used by insights-inventory-frontend. If the fetch
 * returns no instances, then simply return an empty React Fragment.
 * The InventorySystemProperties additionally handles the UX for the loading
 * state, and displays a number of skeleton rows while the data retrieval is
 * happening.
 *
 * Once the runtimes-inventory information has been retrieved, the instance
 * data is passed into the RuntimesProcessesAccordion, which iterates through
 * each instance and displays information as denoted in the instanceDataRows map.
 *
 * @param hostname the fqdn of the host to display processes for
 */
const HelloWorld = () => {
  return <Card>Hello World</Card>;
};

export default HelloWorld;
