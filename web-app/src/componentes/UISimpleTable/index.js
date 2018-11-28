import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

function UISimpleTable(props) {
  const { classes, questoes } = props;
  console.log(questoes)

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Questão</TableCell>
            {/*
            <TableCell>A</TableCell>
            <TableCell>B</TableCell>
            <TableCell>C</TableCell>
            <TableCell>D</TableCell>
            */}
          </TableRow>
        </TableHead>
        <TableBody>
          {questoes.map(questao => {
            return (
              <TableRow key={questao.codigo_questao}>
                <TableCell component="th" scope="row">
                  {questao.enunciado}
                </TableCell>
                {/*
                <TableCell numeric>{n.calories}</TableCell>
                <TableCell numeric>{n.fat}</TableCell>
                <TableCell numeric>{n.carbs}</TableCell>
                <TableCell numeric>{n.protein}</TableCell>
                */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

UISimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UISimpleTable);