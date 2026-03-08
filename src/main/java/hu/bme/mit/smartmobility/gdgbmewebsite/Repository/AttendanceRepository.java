package hu.bme.mit.smartmobility.gdgbmewebsite.Repository;

import hu.bme.mit.smartmobility.gdgbmewebsite.Model.Attendance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    boolean existsByUserIdAndEventId(Long userId, Long eventId);

    Optional<Attendance> findByUserIdAndEventId(Long userId, Long eventId);

    List<Attendance> findByUserId(Long userId);

    Page<Attendance> findByEventId(Long eventId, Pageable pageable);

    /** Leaderboard query – total points per user. */
    @Query("""
        SELECT a.user.id, SUM(a.pointsEarned)
        FROM Attendance a
        GROUP BY a.user.id
        ORDER BY SUM(a.pointsEarned) DESC
        """)
    List<Object[]> aggregatePointsPerUser();
}
