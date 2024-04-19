import { To } from 'react-router-dom';
import { JvmInstance } from '../api/interfaces';

export const linkBasename = '/staging/starter';
export const mergeToBasename = (to: To, basename: string): To => {
  if (typeof to === 'string') {
    // replace possible "//" after basename
    return `${basename}/${to}`.replace(`^${basename}//`, '/');
  }

  return {
    ...to,
    pathname: `${basename}/${to.pathname}`.replace(`^${basename}//`, '/'),
  };
};

export const formatInstancesData = (instances: JvmInstance[]) => {
  instances.forEach((instance) => {
    instance.title = instance.workload;
    // add the appName value to a JvmInstance
    if (!instance['appName']) {
      instance.appName = instance.details['app.name'];
    }
    // change the unidentified workload type, and set the title to the application name
    if (instance.workload === 'Unidentified') {
      instance.workload = `General Java Application`;
      instance.title = instance.appName;
    }
    // format the date string
    // TODO: revisit how the date is returned from runtimes-inventory
    // In the event that a ZonedDateTime string cannot be parsed by new Date(), the assigned
    // value becomes 'Invalid Date' and no error is thrown. For now, try the date conversion
    // and if it falls through then use the default ZonedDateTime for now.
    const parsedCreated = new Date(instance.created).toLocaleString();
    if (parsedCreated !== 'Invalid Date') {
      instance.created = parsedCreated;
    }
    // format the GC details string
    const regex = new RegExp('gc::(.*?)::(.*?)$');
    const match = regex.exec(instance.jvmHeapGcDetails);
    if (match && match[1] && match[2]) {
      instance.jvmHeapGcDetails = match[1] + ', ' + match[2];
    }
  });
  return instances;
};
