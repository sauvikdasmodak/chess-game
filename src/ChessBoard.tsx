import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Chess, type Square } from 'chess.js';

const PIECE_SYMBOLS: Record<string, string> = {
  wp: '♙', wn: '♘', wb: '♗', wr: '♖', wq: '♕', wk: '♔',
  bp: '♟', bn: '♞', bb: '♝', br: '♜', bq: '♛', bk: '♚',
};

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

type ChessBoardProps = {
  game: Chess;
  onMoveMade: () => void;
};

export default function ChessBoard({ game, onMoveMade }: ChessBoardProps) {
  const { width } = useWindowDimensions();
  const boardSize = Math.min(width - 32, 420);
  const squareSize = boardSize / 8;

  const [selected, setSelected] = useState<Square | null>(null);
  const legalTargets = selected
    ? game.moves({ square: selected, verbose: true }).map((m) => m.to as Square)
    : [];

  const handlePress = (square: Square) => {
    const piece = game.get(square);

    if (selected && legalTargets.includes(square)) {
      // Always promote to a queen; chess.js ignores the option for non-promotion moves.
      game.move({ from: selected, to: square, promotion: 'q' });
      setSelected(null);
      onMoveMade();
      return;
    }

    if (piece && piece.color === game.turn()) {
      setSelected(square === selected ? null : square);
      return;
    }

    setSelected(null);
  };

  return (
    <View style={[styles.board, { width: boardSize, height: boardSize }]}>
      {FILES.map((file, colIndex) =>
        [0, 1, 2, 3, 4, 5, 6, 7].map((rowIndex) => {
          const rank = 8 - rowIndex;
          const square = `${file}${rank}` as Square;
          const piece = game.get(square);
          const isDark = (colIndex + rowIndex) % 2 === 1;
          const isSelected = square === selected;
          const isLegalTarget = legalTargets.includes(square);

          return (
            <Pressable
              key={square}
              onPress={() => handlePress(square)}
              style={[
                styles.square,
                {
                  width: squareSize,
                  height: squareSize,
                  left: colIndex * squareSize,
                  top: rowIndex * squareSize,
                  backgroundColor: isDark ? '#b58863' : '#f0d9b5',
                },
                isSelected && styles.selectedSquare,
              ]}
            >
              {piece && (
                <Text style={[styles.piece, { fontSize: squareSize * 0.65 }]}>
                  {PIECE_SYMBOLS[`${piece.color}${piece.type}`]}
                </Text>
              )}
              {isLegalTarget && <View style={styles.legalDot} />}
            </Pressable>
          );
        }),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    position: 'relative',
    borderWidth: 2,
    borderColor: '#3e2723',
  },
  square: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSquare: {
    backgroundColor: '#7fb069',
  },
  piece: {
    textAlign: 'center',
  },
  legalDot: {
    position: 'absolute',
    width: '30%',
    height: '30%',
    borderRadius: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
