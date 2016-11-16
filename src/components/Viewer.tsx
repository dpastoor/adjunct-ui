
import * as React from 'react';
import {observer} from 'mobx-react';
import ViewModel from '../models/ViewModel';

interface Props {
    ViewModel: ViewModel
}

@observer
export class Viewer extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    return (
        <div
        dangerouslySetInnerHTML={{__html: this.props.ViewModel.html}}
        />
    );
  }
}
