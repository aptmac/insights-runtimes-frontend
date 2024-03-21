import { Fragment, useEffect, useState } from 'react';
import { EapInstance, JvmInstance } from '../api/interfaces';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionToggle,
  TextContent,
  TextList,
  TextListItem,
  TextListItemVariants,
  TextListVariants,
} from '@patternfly/react-core';
import React from 'react';

interface CardRows {
  id: string; // JvmInstance attribute key
  title: string; // formatted string to be displayed in the card
}

// List where each entry contains the JSON attribute key and the corresponding formatted title for the card
const rowNames: Array<CardRows> = [
  { id: 'workload', title: 'Workload Type' },
  // ['deployments', 'EAP deployments'], // will need to better handle this, Deployments is an array not a singular entity
  { id: 'appName', title: 'Application' },
  { id: 'javaVendor', title: 'Vendor' },
  { id: 'appUserDir', title: 'Application directory' },
  { id: 'javaClassVersion', title: 'Class version' },
  { id: 'javaVmName', title: 'VM name' },
  { id: 'jvmHeapGcDetails', title: 'Heap gc details' },
  { id: 'heapMin', title: 'Heap min' },
  { id: 'heapMax', title: 'Heap max' },
  { id: 'javaHome', title: 'Java home path' },
  // { id: 'javaClassPath', title: 'Class path' },
];

const ProcessesAccordion = ({
  instances,
}: {
  instances: JvmInstance[] | EapInstance[];
}) => {
  // Following code is borrowed from: https://www.patternfly.org/components/accordion/
  const [expanded, setExpanded] = useState(['']);
  const toggle = (id: string) => {
    const index = expanded.indexOf(id);
    const newExpanded: string[] =
      index >= 0
        ? [
            ...expanded.slice(0, index),
            ...expanded.slice(index + 1, expanded.length),
          ]
        : [...expanded, id];
    setExpanded(newExpanded);
  };
  useEffect(() => {
    if (instances.length == 1) {
      setExpanded(['0-toggle']);
    }
  }, []);
  return (
    <Accordion asDefinitionList={false} togglePosition="start">
      <TextContent>
        {instances.map((instance, index) => {
          return (
            <AccordionItem key={index}>
              <AccordionToggle
                id={`${index}-toggle`}
                onClick={() => toggle(`${index}-toggle`)}
                isExpanded={expanded.includes(`${index}-toggle`)}
                style={{
                  // the styling for the Accordion is pulling in the pf4-v5.css
                  // these are used to make it look more like the pf5 Accordion at the moment
                  justifyContent: 'start',
                  columnGap: 16,
                }}
              >
                {instance.workload}
              </AccordionToggle>
              <AccordionContent
                isHidden={!expanded.includes(`${index}-toggle`)}
                style={{
                  // by default the Accordion content is smaller and light gray, which is kind of hard to read
                  // use the following styling to better match the mockups
                  fontSize: 'inherit',
                  color: 'inherit',
                }}
              >
                <TextList component={TextListVariants.dl}>
                  {rowNames.map((row) => {
                    return (
                      <Fragment key={`${row.id} title`}>
                        <TextListItem
                          component={TextListItemVariants.dt}
                          data-ouia-component-id={`${row.id} title`}
                          aria-label={`${row.id} title`}
                        >
                          {row.title}
                        </TextListItem>
                        <TextListItem
                          key={`${row.id} value`}
                          component={TextListItemVariants.dd}
                          data-ouia-component-id={`${row.id} value`}
                          aria-label={`${row.id} value`}
                        >
                          {instance[row.id as keyof typeof instance]}
                        </TextListItem>
                      </Fragment>
                    );
                  })}
                </TextList>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </TextContent>
    </Accordion>
  );
};

export default ProcessesAccordion;
