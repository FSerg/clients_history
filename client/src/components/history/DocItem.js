import React, { Component } from 'react';
import { Card, Label, Table, Button } from 'semantic-ui-react';
import { getDateStr } from '../../utils/Utils';

class DocItem extends Component {
  renderTwo = (Name, Info) => {
    if (!Info) {
      return null;
    }
    return (
      <span style={{ marginLeft: '1em' }}>
        {Name}: <Label>{Info}</Label>
      </span>
    );
  };

  renderOne = (Name, isTrue, Color) => {
    if (isTrue) {
      return (
        <Label basic color={Color}>
          {Name}
        </Label>
      );
    }
    return null;
  };

  renderMedDoc = doc => {
    if (!doc.isMedDoc) {
      return null;
    }
    return (
      <Button positive disabled size="tiny" style={{ float: 'right' }}>
        Мед.документ
      </Button>
    );
  };

  render() {
    const doc = this.props.doc;
    return (
      <Card fluid key={doc._id}>
        <Card.Content>
          <Card.Header>
            <Label size="big">{doc.Client}</Label>
            Визит / Прием: {doc.DocNumber} от {getDateStr(doc.DocDate)}
            <Label style={{ float: 'right' }} size="big" color="blue">
              {doc.Sum} р.
            </Label>
          </Card.Header>
          <Card.Meta>
            Автор: {doc.CreatedBy}, {doc.Cashdesk}
          </Card.Meta>
          <Card.Description>
            <Table compact size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>№</Table.HeaderCell>
                  <Table.HeaderCell>Наименование</Table.HeaderCell>
                  <Table.HeaderCell>Кол.</Table.HeaderCell>
                  <Table.HeaderCell>Цена</Table.HeaderCell>
                  <Table.HeaderCell>Сумма</Table.HeaderCell>
                  <Table.HeaderCell>Скидка</Table.HeaderCell>
                  <Table.HeaderCell>Всего</Table.HeaderCell>
                  <Table.HeaderCell>Сотрудник</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {doc.Services.map(item => (
                  <Table.Row key={item.Index}>
                    <Table.Cell>{item.Index}</Table.Cell>
                    <Table.Cell>
                      {item.ServiceCode} - {item.ServiceName}
                    </Table.Cell>
                    <Table.Cell>{item.Count}</Table.Cell>
                    <Table.Cell>{item.Price}</Table.Cell>
                    <Table.Cell>{item.Sum}</Table.Cell>
                    <Table.Cell>{item.DiscountSum}</Table.Cell>
                    <Table.Cell>{item.Total}</Table.Cell>
                    <Table.Cell>{item.Employee}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>

              <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan="8">
                    {this.renderOne('Первичный', doc.isPrimary, 'blue')}
                    {this.renderOne('Профосмотр', doc.isProf, 'blue')}
                    {this.renderTwo('Сотрудник', doc.Employee)}
                    {this.renderTwo('Кто направил', doc.Sender)}
                    {this.renderMedDoc(doc)}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default DocItem;
