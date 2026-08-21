export const en = {
  settings: {
    title: 'Settings - Charts',
    generalHeading: 'General',
    contextMenu: {
      name: 'Show Button in Context Menu',
      desc: 'If enabled, you will se a Button in your Editor Context Menu to open the Chart Creator.',
    },
    colorsHeading: 'Colors',
    colorsDesc: {
      body: 'Set the Colors for your Charts. This will set the border Color and the inner Color will be the same, but with less opacity. This ensures better compatibility with Dark and Light Mode. ',
      linkLead: 'You can use any ',
      linkText: 'valid CSS Color.',
      linkTail: '',
    },
    themeColors: {
      name: 'Enable Theme Colors',
      desc: 'If your Obsidian Theme (or snippet) provides Colors you can use them instead.',
    },
    color: {
      name: (index: number): string => `Color #${index}`,
      desc: 'This will be the border Color used in the Charts you create.',
      change: 'Change Color',
      remove: 'Remove',
      reset: 'Reset to default',
      add: 'Add Color',
    },
    imageHeading: 'Chart to Image Converter',
    imageHowToUse: 'How to use',
    imageFormat: {
      name: 'Image Format',
      desc: 'The Format to be used, when generating a Image from a Chart.',
    },
    imageQuality: {
      name: 'Image Quality',
      desc: 'If using a lossy format, set the Image Quality.',
    },
  },
  commands: {
    insertNewChart: 'Insert new Chart',
    chartFromTableColumn: 'Create Chart from Table (Column oriented Layout)',
    chartFromTableRow: 'Create Chart from Table (Row oriented Layout)',
    chartToImage: 'Create Image from Chart',
    contextMenuInsertChart: 'Insert Chart',
  },
  notices: {
    renderingChart: 'Rendering Chart...',
    tableMalformed: 'Table malformed',
  },
  errors: {
    couldNotRender: "Couldn't render Chart:",
    consoleHint:
      'You might also want to look for further Errors in the Console: Press <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>I</kbd> to open it.',
    missingFields: 'Missing type, labels or series',
    invalidId: 'Invalid id and/or file',
    noTableAtId: 'There is no table at that id and/or file',
    alphaNotANumber: 'Provided alpha value is not a number',
  },
  helper: {
    title: 'Create a new Chart',
    chartType: {
      name: 'Chart Type',
      desc: 'Choose a Chart Type',
      options: {
        bar: 'Bar',
        line: 'Line',
        pie: 'Pie',
        doughnut: 'Doughnut',
        radar: 'Radar',
        polarArea: 'Polar Area',
      },
    },
    smoothness: {
      name: 'Smoothness',
      desc: 'Changes the smoothness of the Chart',
    },
    width: {
      name: 'Width',
      desc: 'Changes the horizontal width',
    },
    fill: {
      name: 'Fill',
      desc: 'Fill the underside of the Chart',
    },
    distinctColors: {
      name: 'Distinct Colors',
      desc: 'Use distinct Colors for each Label',
    },
    startAtZero: {
      name: 'Start at Zero',
      desc: "Don't cut the graph at the bottom",
    },
    xAxis: {
      name: 'X Axis',
      desc: 'Set Labels (Comma seperated)',
      placeholder: 'Monday, Tuesday, ...',
    },
    yAxis: {
      name: 'Y Axis',
      desc: 'Set Data Fields (Comma seperated)',
      namePlaceholder: 'Name',
      dataPlaceholder: '1, -2, 11, 5',
    },
    addMore: 'Add more',
    bestFitSection: 'Line of Best Fit (Line chart only)',
    bestFit: {
      name: 'Line of Best Fit',
      desc: 'Create a line of best fit',
    },
    bestFitId: {
      name: 'Best Fit Line ID',
      desc: 'The line ID used to create the line of best fit',
      placeholder: '0',
    },
    bestFitTitle: {
      name: 'Line of Best Fit Title',
      desc: 'The title for the line of best fit',
      placeholder: 'Line of Best Fit',
    },
    insertChart: 'Insert Chart',
  },
};

export type LocaleStrings = typeof en;
