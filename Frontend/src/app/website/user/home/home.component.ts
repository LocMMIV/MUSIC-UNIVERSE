import { Component } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  suggestSongs = [
    { image: '../../../../assets/images/moloichoem.jpg', songName: 'Mở Lối Cho Em', artist: 'Lương Huy Tuấn, Hữu Công',
      isLiked: false, audioUrl: '../../../../assets/audio/moloichoem.mp3' },
    { image: '../../../../assets/images/noinhovohan.jpg',songName: 'Nỗi Nhớ Vô Hạn', artist: 'Thanh Hưng', 
      isLiked: false, audioUrl: '../../../../assets/audio/noinhovohan.mp3' },
    { image: '../../../../assets/images/moloichoem2.jpg',songName: 'Mở Lối Cho Em 2', artist: 'Lương Huy Tuấn, An Clock',
      isLiked: false, audioUrl: '../../../../assets/audio/moloichoem2.mp3' },
    { image: '../../../../assets/images/vansutuyduyen.jpg',songName: 'Vạn Sự Tùy Duyên', artist: 'Thanh Hưng',
      isLiked: false, audioUrl: '../../../../assets/audio/vansutuyduyen.mp3' },
    { image: '../../../../assets/images/duoitancaykhohoano.jpg',songName: 'Dưới Tán Cây Khô Hoa Nở', artist: 'J97', 
      isLiked: false, audioUrl: '../../../../assets/audio/duoitancaykhohoano.mp3' },
    { image: '../../../../assets/images/suotdoikhongxung.jpg',songName: 'Suốt Đời Không Xứng', artist: 'Khải Đăng, Vương Anh Tú, Ribi Sachi', 
      isLiked: false, audioUrl: '../../../../assets/audio/suotdoikhongxung.mp3' },
    { image: '../../../../assets/images/chanhlongthuongco4.jpg',songName: 'Chạnh Lòng Thương Cô 4', artist: 'Huy Vạc', 
      isLiked: false, audioUrl: '../../../../assets/audio/chanhlongthuongco4.mp3' },
    { image: '../../../../assets/images/chieuthuhoabongnang.jpg',songName: 'Chiều Thu Họa Bóng Nàng', artist: 'Đatkka', 
    isLiked: false, audioUrl: '../../../../assets/audio/chieuthuhoabongnang.mp3' },
    { image: '../../../../assets/images/tralaithanhxuanchoem.jpg',songName: 'Trả Lại Thanh Xuân Cho Em', artist: 'H2K', 
      isLiked: false, audioUrl: '../../../../assets/audio/tralaithanhxuanchoem.mp3' },
  ];

  newSongs = [
    { image: '../../../../assets/images/moloichoem.jpg', songName: 'Mở Lối Cho Em', artist: 'Lương Huy Tuấn, Hữu Công',
      audioUrl: '../../../../assets/audio/moloichoem.mp3' },
    { image: '../../../../assets/images/noinhovohan.jpg',songName: 'Nỗi Nhớ Vô Hạn', artist: 'Thanh Hưng', 
      audioUrl: '../../../../assets/audio/noinhovohan.mp3' },
    { image: '../../../../assets/images/moloichoem2.jpg',songName: 'Mở Lối Cho Em 2', artist: 'Lương Huy Tuấn, An Clock',
      audioUrl: '../../../../assets/audio/moloichoem2.mp3' },
    { image: '../../../../assets/images/vansutuyduyen.jpg',songName: 'Vạn Sự Tùy Duyên', artist: 'Thanh Hưng',
      audioUrl: '../../../../assets/audio/vansutuyduyen.mp3' },
    { image: '../../../../assets/images/duoitancaykhohoano.jpg',songName: 'Dưới Tán Cây Khô Hoa Nở', artist: 'J97', 
      audioUrl: '../../../../assets/audio/duoitancaykhohoano.mp3' },
    { image: '../../../../assets/images/suotdoikhongxung.jpg',songName: 'Suốt Đời Không Xứng', artist: 'Khải Đăng, Vương Anh Tú, Ribi Sachi', 
      audioUrl: '../../../../assets/audio/suotdoikhongxung.mp3' },
    { image: '../../../../assets/images/chanhlongthuongco4.jpg',songName: 'Chạnh Lòng Thương Cô 4', artist: 'Huy Vạc', 
      audioUrl: '../../../../assets/audio/chanhlongthuongco4.mp3' },
    { image: '../../../../assets/images/chieuthuhoabongnang.jpg',songName: 'Chiều Thu Họa Bóng Nàng', artist: 'Đatkka', 
      audioUrl: '../../../../assets/audio/chieuthuhoabongnang.mp3' },
    { image: '../../../../assets/images/tralaithanhxuanchoem.jpg',songName: 'Trả Lại Thanh Xuân Cho Em', artist: 'H2K', 
      audioUrl: '../../../../assets/audio/tralaithanhxuanchoem.mp3' },
  ];

  suggestRows: any[] = [];
  newRows: any[] = [];
  currentSong: any = null;
  chunkSize = 3;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.suggestRows = this.chunkArray(this.suggestSongs, 3);
    this.newRows = this.chunkArray(this.newSongs, 3);
  }

  chunkArray(array: any[], chunkSize: number): any[] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    // Giới hạn số lượng phần tử hiển thị ở mỗi nhóm
    return result.slice(0, 3); // Chỉ lấy tối đa 3 nhóm
  }

  playSong(song: any) {
    const audioPlayer = document.querySelector('audio') as HTMLAudioElement;

    if (this.currentSong === song) {
      // Nếu bài hát đã đang phát, dừng lại
      this.currentSong = null;
      audioPlayer.pause();
    } else {
      // Phát bài hát mới
      this.currentSong = song;
      audioPlayer.src = song.audioUrl;
      audioPlayer.play();
    }
  }

  toggleLike(rowIndex: number, columnIndex: number) {
    const globalIndex = rowIndex * this.chunkSize + columnIndex;
    const song = this.suggestSongs[globalIndex];
  
    if (song.isLiked) {
      song.isLiked = false;
      this.notificationService.showMessage(`${song.songName} đã xóa khỏi danh sách yêu thích!`, 'success');
    } else {
      song.isLiked = true;
      this.notificationService.showMessage(`${song.songName} đã thêm vào danh sách yêu thích!`, 'success');
    }
  }
}