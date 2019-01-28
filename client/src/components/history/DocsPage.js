import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Divider, Card, Message, Loader, Label } from 'semantic-ui-react';
import DocItem from './DocItem';
import { getDocs } from '../../actions/docsActions';

class DocsPage extends Component {
  componentDidMount() {
    if (this.props.match.params.code) {
      const clientCode = this.props.match.params.code;
      this.props.getDocs(clientCode);
    }
  }

  render() {
    return (
      <div>
        {this.props.error ? (
          <Message negative>
            <Message.Header>Что-то пошло не так!</Message.Header>
            <p>{this.props.error}</p>
          </Message>
        ) : null}

        {this.props.isLoading ? (
          <Loader
            active
            size="large"
            inline="centered"
            style={{ marginTop: '5em', marginBottom: '5em' }}
          />
        ) : (
          <div style={{ padding: '2em 0em' }}>
            <h2>
              Список документов по клиненту {this.props.match.params.code}
            </h2>
            <Divider />
            <Card.Group>
              {this.props.docs.map(doc => (
                <DocItem key={doc._id} doc={doc} />
              ))}
            </Card.Group>
          </div>
        )}
      </div>
    );
  }
}

DocsPage.propTypes = {
  getDocs: PropTypes.func.isRequired,
  docs: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.string
};

DocsPage.defaultProps = {
  docs: [],
  isLoading: false,
  error: ''
};

const mapStateToProps = state => {
  return {
    docs: state.docsStore.docs,
    isLoading: state.docsStore.isLoading,
    error: state.docsStore.error
  };
};

export default connect(
  mapStateToProps,
  { getDocs }
)(DocsPage);
