import { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Chess } from 'chess.js';
import ChessBoard from './src/ChessBoard';

export default function App() {
  const game = useMemo(() => new Chess(), []);
  // chess.js mutates `game` in place, so bump this to force a re-render after each move.
  const [moveCount, setMoveCount] = useState(0);

  const statusText = useMemo(() => {
    if (game.isCheckmate()) {
      return `Checkmate — ${game.turn() === 'w' ? 'Black' : 'White'} wins`;
    }
    if (game.isStalemate()) return 'Stalemate — draw';
    if (game.isDraw()) return 'Draw';
    const turn = game.turn() === 'w' ? 'White' : 'Black';
    return game.isCheck() ? `${turn} to move — Check!` : `${turn} to move`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveCount]);

  const handleReset = () => {
    game.reset();
    setMoveCount((count) => count + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chess</Text>
      <Text style={styles.status}>{statusText}</Text>
      <ChessBoard game={game} onMoveMade={() => setMoveCount((count) => count + 1)} />
      <Pressable style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>New Game</Text>
      </Pressable>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  status: {
    fontSize: 16,
    color: '#e0e0e0',
    marginBottom: 8,
  },
  resetButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: '#7fb069',
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#1b1b1b',
    fontWeight: '600',
    fontSize: 16,
  },
});
